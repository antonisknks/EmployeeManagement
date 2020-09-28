using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class Employee
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? HiringDate { get; set; }
        public int Tenant { get; set; } //SaaS
        public DateTime? SkillsetUpdate { get; set; }

        public ICollection<EmployeeSkill> EmployeeSkills { get; set; }


        //public override string ToString()
        //{
        //    StringBuilder sb = new StringBuilder();

        //    return base.ToString();
        //}


    }
}
