using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class EmployeeSkill
    {
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int SkillId { get; set; }
        public Skill Skill { get; set; }



        public EmployeeSkill() { }
        public EmployeeSkill(int eid, int sid) {
            EmployeeId = eid;
            SkillId = sid;

        }
    }
}
