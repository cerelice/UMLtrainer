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
    
    public partial class Diagram
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Diagram()
        {
            this.Tasks = new HashSet<Task>();
            this.Nodes = new HashSet<Node>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<int> DiagramTypeId { get; set; }
    
        public virtual DiagramType DiagramType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Task> Tasks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Node> Nodes { get; set; }
    }
}
