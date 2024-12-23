using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDvpDatabase.Models.DTOs;
using WebDvpDatabase.Models.Entidades;

namespace WebDvpLogic.Interface
{
    public interface IPersonaService
    {
        Task<IEnumerable<Persona>> ObtenerPersonas();
        Task<Persona> ObtenerPersonaPorId(int id);
        Task<ResponseDTO<Persona>> CrearPersona(PersonaDTO personaDTO);
        Task<ResponseDTO<Persona>> ActualizarPersona(PersonaDTO personaDTO, int id);
        Task<ResponseDTO<Persona>> EliminarPersona(int id);

    }
}
