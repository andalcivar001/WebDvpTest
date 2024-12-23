using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace  WebDvpDatabase.Models.DTOs
{
    public class PersonaDTO
    {
        public string? NumeroIdentificacion { get; set; }
        public string? TipoIdentificacion { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? Email { get; set; }

    }
}
