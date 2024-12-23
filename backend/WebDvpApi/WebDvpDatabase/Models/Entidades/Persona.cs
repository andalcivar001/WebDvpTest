using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebDvpDatabase.Models.Entidades
{
    public class Persona 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string? NumeroIdentificacion { get; set; } 

        [Required]
        [MaxLength(1)]
        public string? TipoIdentificacion { get; set; }


        [MaxLength(300)]
        [Required]
        public string? Nombres { get; set; }

        [MaxLength(300)]
        [Required]
        public string? Apellidos { get; set; }

        public string? Email { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public string Identificacion
        {
            get
            {                
                return TipoIdentificacion + " " + NumeroIdentificacion;
            }
        }


        public string NombreCompleto
        {
            get
            {
                return Nombres + " " + Apellidos;
            }
        }
    }
}
