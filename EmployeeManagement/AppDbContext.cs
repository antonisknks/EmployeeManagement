using EmployeeManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        { }

        //public AppDbContext()
        //{
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeSkill>()
                .HasKey(t => new { t.EmployeeId, t.SkillId});

            modelBuilder.Entity<EmployeeSkill>()
                .HasOne(pt => pt.Skill)
                .WithMany(p => p.EmployeeSkills)
                .HasForeignKey(pt => pt.SkillId);

            modelBuilder.Entity<EmployeeSkill>()
                .HasOne(pt => pt.Employee)
                .WithMany(t => t.EmployeeSkills)
                .HasForeignKey(pt => pt.EmployeeId);
        }

        public DbSet<EmployeeManagement.Models.Employee> Employee { get; set; }

        public DbSet<EmployeeManagement.Models.Skill> Skill { get; set; }

        public DbSet<EmployeeManagement.Models.EmployeeSkill> EmployeeSkill { get; set; }

        public DbSet<EmployeeManagement.Models.Logs> Logs { get; set; }

     

    }
}
