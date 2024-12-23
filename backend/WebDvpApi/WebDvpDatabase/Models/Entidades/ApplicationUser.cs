using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

 namespace WebDvpDatabase.Models.Entidades

{
    public class ApplicationUser : IdentityUser<long>
    {
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
      
    }

    public class ApplicationRole : IdentityRole<long>
    {

    }
}
