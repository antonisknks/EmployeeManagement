using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.Models;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeSkillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeSkillsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeSkills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeSkill>>> GetEmployeeSkill()
        {
            return await _context.EmployeeSkill.ToListAsync();
        }

        // GET: api/EmployeeSkills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeSkill>> GetEmployeeSkill(int id)
        {
            var employeeSkill = await _context.EmployeeSkill.FindAsync(id);

            if (employeeSkill == null)
            {
                return NotFound();
            }

            return employeeSkill;
        }

        // PUT: api/EmployeeSkills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeSkill(int id, EmployeeSkill employeeSkill)
        {
            if (id != employeeSkill.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employeeSkill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeSkillExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeSkills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{eid}/{sid}")]
        public async Task<ActionResult<EmployeeSkill>> PostEmployeeSkill(int eid, int sid)
        {
            EmployeeSkill employeeSkill = new EmployeeSkill(eid,sid);
            _context.EmployeeSkill.Add(employeeSkill);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmployeeSkillExists(employeeSkill.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployeeSkill", new { id = employeeSkill.EmployeeId }, employeeSkill);
        }

        // DELETE: api/EmployeeSkills/5/6
        [HttpDelete("{eid}/{sid}")]
        public async Task<ActionResult<EmployeeSkill>> DeleteEmployeeSkill(int eid, int sid)
        {
            EmployeeSkill employeeSkill =  _context.EmployeeSkill.Where(c=>c.EmployeeId==eid && c.SkillId==sid).FirstOrDefault();
            if (employeeSkill == null)
            {
                return  NotFound();
            }

            _context.EmployeeSkill.Remove(employeeSkill);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool EmployeeSkillExists(int id)
        {
            return _context.EmployeeSkill.Any(e => e.EmployeeId == id);
        }
    }
}
