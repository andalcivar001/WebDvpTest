using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebDvpDatabase.Models.DTOs;
using WebDvpLogic.Interface;


namespace WebDvpApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : Controller
    {
        public IPersonaService _personaService;
        private readonly ILogger<PersonaController> _logger;

        public PersonaController(IPersonaService personaService, ILogger<PersonaController> logger)
        {
            _personaService = personaService;
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await this._personaService.ObtenerPersonas();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PersonaController.Get - Error al consultar personas ");
                return BadRequest("Error obtienendo las personas.");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {

            try
            {
                var result = await this._personaService.ObtenerPersonaPorId(id);
                if (result == null)
                {
                    return StatusCode(404, "No se encuentra la persona con el id " + id.ToString());
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PersonaController.Get - Error al consultar persona por ID: {id} ",id.ToString());
                return BadRequest("Error obtienendo la persona.");
            }
        }

        [HttpPost()]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] PersonaDTO personaDTO)
        {
            try
            {
                var result = await this._personaService.CrearPersona(personaDTO);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PersonaController.Put - Error al crear la persona - Datos: {@PersonaDTO}", personaDTO);
                return BadRequest("Error creando la persona.");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] PersonaDTO personaDTO, int id)
        {
            try
            {
                var result = await this._personaService.ActualizarPersona(personaDTO, id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PersonaController.Put - Error al actualizar la persona - Datos: {@PersonaDTO}", personaDTO);
                return BadRequest("Error actualizando la persona");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await this._personaService.EliminarPersona(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PersonaController.Get - Error al eliminar persona ID: {id} ", id.ToString());
                return BadRequest("Error al eliminar la persona");
            }
        }
    }
}
