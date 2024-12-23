using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebDvpDatabase.Models.Entidades;


namespace WebDvpDatabase.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, long>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Persona> Persona { get; set; } 
        

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);

            builder.Ignore<IdentityUserClaim<long>>(); // Ignorar la entidad completa
            builder.Ignore<IdentityRoleClaim<long>>(); // Ignorar la entidad completa
            builder.Ignore<IdentityUserToken<long>>(); // Ignorar la entidad completa

        }
    }
}
