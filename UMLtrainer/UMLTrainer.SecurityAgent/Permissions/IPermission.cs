using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UMLTrainer.SecurityAgent.Permissions
{
    public interface IPermission
    {
         PermissionType Permission { get; }
    }
}
