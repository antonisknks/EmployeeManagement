using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class Logs
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int LogId { get; set; }
        public string Description { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime? Date { get; set; }
    }
}
