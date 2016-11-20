using System;
using System.Web.Http.Controllers;

namespace UMLTrainer.SecurityAgent.Permissions
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true)]
    public class CompletePermission : BasePermission, IPermission
    {
        public PermissionType Permission => PermissionType.CompleteTopic;

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            return base.IsAuthorized(actionContext, this.Permission);
        }
    }
}
