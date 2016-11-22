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
    
    public partial class Element
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Element()
        {
            this.Nodes = new HashSet<Node>();
        }
    
        public string Id { get; set; }
        public string Name { get; set; }
        public string ShapeId { get; set; }
        public string DiagramTypeId { get; set; }
    
        public virtual DiagramType DiagramType { get; set; }
        public virtual Shape Shape { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Node> Nodes { get; set; }
    }
}