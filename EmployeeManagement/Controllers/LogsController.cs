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
    public class LogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LogsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Logs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Logs>>> GetLogs()
        {
            return await _context.Logs.ToListAsync();
        }

        // GET: api/Logs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Logs>> GetLogs(int id)
        {
            var logs = await _context.Logs.FindAsync(id);

            if (logs == null)
            {
                return NotFound();
            }

            return logs;
        }

        // PUT: api/Logs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLogs(int id, Logs logs)
        {
            if (id != logs.LogId)
            {
                return BadRequest();
            }

            _context.Entry(logs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LogsExists(id))
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

        // POST: api/Logs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Logs>> PostLogs(Logs logs)
        {
            _context.Logs.Add(logs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogs", new { id = logs.LogId }, logs);
        }

        // DELETE: api/Logs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Logs>> DeleteLogs(int id)
        {
            var logs = await _context.Logs.FindAsync(id);
            if (logs == null)
            {
                return NotFound();
            }

            _context.Logs.Remove(logs);
            await _context.SaveChangesAsync();

            return logs;
        }

        private bool LogsExists(int id)
        {
            return _context.Logs.Any(e => e.LogId == id);
        }
    }
}
