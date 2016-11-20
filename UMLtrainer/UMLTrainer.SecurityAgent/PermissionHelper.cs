using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using UMLTrainer.SecurityAgent.Permissions;

namespace UMLTrainer.SecurityAgent
{
    public static class PermissionHelper
    {
        private static readonly string HashKey = ConfigurationManager.AppSettings["HashKey"];

        private const string ClaimTypePermission = "Permission";

        private const int DerivationIterations = 1000;

        private const int Keysize = 256;

        public static IEnumerable<PermissionType> GetPermissions(IPrincipal сurrentPrincipal)
        {
            var claimsPrincipal = сurrentPrincipal as ClaimsPrincipal;

            if (claimsPrincipal == null)
            {
                throw new ArgumentNullException("principal");
            }

            var stringPermission = claimsPrincipal.Identities.FirstOrDefault()
                .Claims.Where(x => x.Type == ClaimTypePermission).Select(x => x.Value).ToList();

            return stringPermission.Select(GetPermissionFromString).ToList();
        }


        public static string GetEncryptedPermission(PermissionType permission)
        {
            var permissionString = permission.ToString();
            var saltStringBytes = Generate256BitsOfRandomEntropy();
            var ivStringBytes = Generate256BitsOfRandomEntropy();
            var plainTextBytes = Encoding.UTF8.GetBytes(permissionString);
            using (var password = new Rfc2898DeriveBytes(HashKey, saltStringBytes, DerivationIterations))
            {
                var keyBytes = password.GetBytes(Keysize / 8);
                using (var symmetricKey = new RijndaelManaged())
                {
                    symmetricKey.BlockSize = 256;
                    symmetricKey.Mode = CipherMode.CBC;
                    symmetricKey.Padding = PaddingMode.PKCS7;
                    using (var encryptor = symmetricKey.CreateEncryptor(keyBytes, ivStringBytes))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                            {
                                cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                                cryptoStream.FlushFinalBlock();
                                var cipherTextBytes = saltStringBytes;
                                cipherTextBytes = cipherTextBytes.Concat(ivStringBytes).ToArray();
                                cipherTextBytes = cipherTextBytes.Concat(memoryStream.ToArray()).ToArray();
                                memoryStream.Close();
                                cryptoStream.Close();
                                return Convert.ToBase64String(cipherTextBytes);
                            }
                        }
                    }
                }
            }
        }

        public static PermissionType GetDecryptedPermission(string encryptedPermission)
        {
            var cipherTextBytesWithSaltAndIv = Convert.FromBase64String(encryptedPermission);
            var saltStringBytes = cipherTextBytesWithSaltAndIv.Take(Keysize / 8).ToArray();
            var ivStringBytes = cipherTextBytesWithSaltAndIv.Skip(Keysize / 8).Take(Keysize / 8).ToArray();
            var cipherTextBytes = cipherTextBytesWithSaltAndIv.Skip((Keysize / 8) * 2).Take(cipherTextBytesWithSaltAndIv.Length - ((Keysize / 8) * 2)).ToArray();

            using (var password = new Rfc2898DeriveBytes(HashKey, saltStringBytes, DerivationIterations))
            {
                var keyBytes = password.GetBytes(Keysize / 8);
                using (var symmetricKey = new RijndaelManaged())
                {
                    symmetricKey.BlockSize = 256;
                    symmetricKey.Mode = CipherMode.CBC;
                    symmetricKey.Padding = PaddingMode.PKCS7;
                    using (var decryptor = symmetricKey.CreateDecryptor(keyBytes, ivStringBytes))
                    {
                        using (var memoryStream = new MemoryStream(cipherTextBytes))
                        {
                            using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                            {
                                var plainTextBytes = new byte[cipherTextBytes.Length];
                                var decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
                                var stringPermission = Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);

                                return GetPermissionFromString(stringPermission);
                            }
                        }
                    }
                }
            }
        }

        private static byte[] Generate256BitsOfRandomEntropy()
        {
            var randomBytes = new byte[32];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetBytes(randomBytes);
            }

            return randomBytes;
        }

        private static PermissionType GetPermissionFromString(string stringPermission)
        {
            return (PermissionType)Enum.Parse(typeof(PermissionType), stringPermission);
        }
    }
}
