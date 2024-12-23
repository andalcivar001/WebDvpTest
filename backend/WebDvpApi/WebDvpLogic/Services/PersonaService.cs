using Microsoft.EntityFrameworkCore;
using WebDvpLogic.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDvpDatabase.Data;
using WebDvpDatabase.Models.Entidades;
using WebDvpDatabase.Models.DTOs;

namespace WebDvpLogic.Services
{
    public class PersonaService : IPersonaService
    {
        private ApplicationDbContext _context;

        public PersonaService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Persona>> ObtenerPersonas()
        {
            try
            {
                var personas = await this._context.Persona.ToListAsync();              
                return personas;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al obtener las personas", ex);
            }

        }

        public async Task<Persona> ObtenerPersonaPorId(int id)
        {
            try
            {
                var persona =  await this._context.Persona.Where(x => x.Id == id).FirstOrDefaultAsync();
                if (persona == null)
                {
                    throw new ApplicationException("No se pudo obtener datos de la persona");

                }
                return persona;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al obtener las persona", ex);

            }
        }
        
        public async Task<ResponseDTO<Persona>> CrearPersona(PersonaDTO personaDTO)
        {
            var personaExiste = await this._context.Persona.Where(x => x.TipoIdentificacion == personaDTO.TipoIdentificacion && x.NumeroIdentificacion == personaDTO.NumeroIdentificacion).FirstOrDefaultAsync();
            if(personaExiste != null)
            {
                return new ResponseDTO<Persona>
                {
                    Status = 404,
                    Success = false,
                    Message = "Ya existe una persona registrada con el mismo tipo y numero de identificacion"
                };
            }
            var persontaToCreate = new Persona();
            persontaToCreate.TipoIdentificacion = personaDTO.TipoIdentificacion;
            persontaToCreate.NumeroIdentificacion = personaDTO.NumeroIdentificacion;
            persontaToCreate.Nombres = personaDTO.Nombres;
            persontaToCreate.Apellidos = personaDTO.Apellidos;
            persontaToCreate.Email = personaDTO.Email;
            this._context.Persona.Add(persontaToCreate);
            await this._context.SaveChangesAsync();
            return new ResponseDTO<Persona>
            {
                Data = persontaToCreate,
                Success =  true,
                Message =  "Persona creada correctamente"
            };
        }

        public async Task<ResponseDTO<Persona>> ActualizarPersona(PersonaDTO personaDTO, int id)
        {
            var personaExiste = await this._context.Persona.Where(x => x.TipoIdentificacion == personaDTO.TipoIdentificacion && x.NumeroIdentificacion == personaDTO.NumeroIdentificacion && x.Id != id).FirstOrDefaultAsync();
            if (personaExiste != null)
            {
                return new ResponseDTO<Persona>
                {
                    Status = 404,
                    Success = false,
                    Message = "Ya existe una persona registrada con el mismo tipo y numero de identificacion"
                };
            }

            var personaToUpdate = await this._context.Persona.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (personaToUpdate == null)
            {
                return new ResponseDTO<Persona>
                {
                    Status = 404,
                    Success = false,
                    Message = "No se ha encontrado la persona con el id " + id.ToString()
                };

            }
            personaToUpdate.Nombres = personaDTO.Nombres;
            personaToUpdate.Apellidos = personaDTO.Apellidos;
            personaToUpdate.TipoIdentificacion = personaDTO.TipoIdentificacion;
            personaToUpdate.NumeroIdentificacion = personaDTO.NumeroIdentificacion;
            personaToUpdate.Email = personaDTO.Email;
            await this._context.SaveChangesAsync();
            return new ResponseDTO<Persona>
            {
                Status = 200,
                Data = personaToUpdate,
                Success = true,
                Message = "Persona actualizada correctamente"
            };
        }

        public async Task<ResponseDTO<Persona>> EliminarPersona(int id)
        {
            var persona = await this._context.Persona.Where(x => x.Id == id).FirstOrDefaultAsync();
            if(persona == null)
            {
                    throw new ApplicationException("No se pudo obtener datos de la persona");
            }
            this._context.Persona.Remove(persona);
            await this._context.SaveChangesAsync();
            return new ResponseDTO<Persona>
            {
                Status = 200,
                Success = true,
                Message = "Persona eliminada correctamente"
            };

        }


    }
}
