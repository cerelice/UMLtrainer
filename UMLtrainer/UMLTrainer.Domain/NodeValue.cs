//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UMLTrainer.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class NodeValue
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public string PropertyId { get; set; }
    
        public virtual Node Node { get; set; }
    }
}
