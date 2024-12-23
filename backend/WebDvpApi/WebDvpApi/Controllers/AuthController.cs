using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebDvpDatabase.Models.DTOs;
using WebDvpLogic.Interface;

namespace WebDvpApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        public IAuthService _autenticacionService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService autenticacionService, ILogger<AuthController> logger)
        {
            _autenticacionService = autenticacionService;
            _logger = logger;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq loginRequest)
        {
            try
            {
                var token = await _autenticacionService.LoginAsync(loginRequest.Username, loginRequest.Password);

                return Ok(new { Token = token });
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "AuthController.Login - Error inesperado durante el login para usuario: {Username}",
                loginRequest.Username);
                
                return Unauthorized(new { message = ex.Message });
            }
        }

      

        [HttpPost("registrarse")]
        public async Task<IActionResult> Register([FromBody] RegisterReq registerRequest)
        {
            try
            {                
                var token = await _autenticacionService.RegisterAsync(registerRequest.Username, registerRequest.Password);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "AuthController.Registrarse - Error inesperado durante el registro para el usuario: {Username}",
                registerRequest.Username);
                return BadRequest(ex.Message);
            }
        }
    }
}
