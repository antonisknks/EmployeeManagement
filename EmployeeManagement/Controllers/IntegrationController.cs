using EmployeeManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class IntegrationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IntegrationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public bool CreateUpdateEmployees(List<Employee> employees)
        {

            foreach (Employee employee in employees)
            {
                if (_context.Employee.Any(e => e.EmployeeId == employee.EmployeeId) == true)
                {
                    //update
                    _context.Entry(employee).State = EntityState.Modified;
                }
                else
                {
                    //insert
                    _context.Employee.Add(employee);
                }

                try
                {
                    _context.SaveChangesAsync();
                }
                catch (Exception)
                {
                    return false;
                }

                return true;
            }
            return false;



        }
    }
}
