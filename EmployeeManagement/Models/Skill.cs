using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class Skill
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int SkillId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? CreationDate { get; set; }
        public int Tenant { get; set; }

        public ICollection<EmployeeSkill> EmployeeSkills { get; set; }

    }


}
