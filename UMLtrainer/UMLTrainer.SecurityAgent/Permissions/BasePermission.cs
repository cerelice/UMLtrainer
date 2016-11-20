using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace UMLTrainer.SecurityAgent.Permissions
{
    public class BasePermission : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (this.IsAuthorized(actionContext))
            {
                return;
            }

            base.OnAuthorization(actionContext);
        }

        protected bool IsAuthorized(HttpActionContext actionContext, PermissionType permission)
        {
            if (actionContext == null)
            {
                throw new ArgumentNullException("actionContext");
            }

            var user = ((ApiController)actionContext.ControllerContext.Controller).User;
            if (!user.Identity.IsAuthenticated)
            {
                return false;
            }

            var userPermissions = PermissionHelper.GetPermissions(user);

            return userPermissions.Contains(permission);
        }
    }
}
