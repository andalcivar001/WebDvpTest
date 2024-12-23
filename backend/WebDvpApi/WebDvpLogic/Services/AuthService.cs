using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WebDvpLogic.Interface;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebDvpDatabase.Models.Entidades;
using WebApiTool;

namespace WebDvpLogic.Repository
{
    
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private ILogger<AuthService> _logger;

        public AuthService(IConfiguration configuration, SignInManager<ApplicationUser> signInManager, ILogger<AuthService> logger, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            // Buscar el usuario en la base de datos
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new UnauthorizedAccessException("Usuario no encontrado.");

            // Verificar la contraseña manualmente
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, password);
            if (!isPasswordValid)
            {
                throw new UnauthorizedAccessException("Contraseña incorrecta.");
            }

            // Generar el token JWT
            return await GenerateJwtToken(user);
        }
        public async Task<string> RegisterAsync(string username, string password)
        {
            var existingUser = await _userManager.FindByNameAsync(username);
            if (existingUser != null)
            {
                throw new Exception($"El usuario {username} ya existe.");
            }

            // Crear el nuevo usuario
            var user = new ApplicationUser { UserName = username };
            var result = await _userManager.CreateAsync(user, password);


            //Desarrollar una dll tipo Nuget en alguna parte de la solución.
            var clase = new ValidadorAuth();
            var retorna = clase.ValidarClave(password);
            if (retorna == false)
            {
                throw new Exception("Clave debe tener mas de 6 caracteres");
            }

            if (!result.Succeeded)
            {
                _logger.LogError(JsonConvert.SerializeObject(result.Errors));
                var passwordErrors = HandlePasswordErrors(result.Errors);
                var generalErrors = HandleGeneralErrors(result.Errors);

                // Si hay errores de contraseña, los devolvemos primero
                if (passwordErrors.Any())
                {
                    throw new Exception(string.Join(" ", passwordErrors)); //por validacion de contrasenia
                }

                throw new Exception($"Error al registrar el usuario {username}. {string.Join(" ", generalErrors)}");
            }

            //await _userManager.AddToRoleAsync(user, "ADMIN");

            return await GenerateJwtToken(user);
        }

        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token =   new JwtSecurityToken(               
                claims: claims,
                expires: DateTime.Now.AddYears(1), //caduca en un año
                signingCredentials: creds
            );

            return  new  JwtSecurityTokenHandler().WriteToken(token);
        }
        private IEnumerable<string> HandlePasswordErrors(IEnumerable<IdentityError> errors)
        {
            var errorMessages = new List<string>();

            foreach (var error in errors)
            {
                if (error.Code == "PasswordTooShort")
                {
                    errorMessages.Add("La contraseña debe tener al menos 6 caracteres.");
                }
                if (error.Code == "PasswordRequiresNonAlphanumeric")
                {
                    errorMessages.Add("La contraseña debe incluir al menos un carácter no alfanumérico.");
                }
                if (error.Code == "PasswordRequiresLower")
                {
                    errorMessages.Add("La contraseña debe contener al menos una letra minúscula.");
                }
                if (error.Code == "PasswordRequiresUpper")
                {
                    errorMessages.Add("La contraseña debe contener al menos una letra mayúscula.");
                }

                
            }

            return errorMessages;
        }


        private IEnumerable<string> HandleGeneralErrors(IEnumerable<IdentityError> errors)
        {
            var generalMessages = new List<string>();

            foreach (var error in errors)
            {
                if (error.Code != "PasswordTooShort" &&
                    error.Code != "PasswordRequiresNonAlphanumeric" &&
                    error.Code != "PasswordRequiresLower" &&
                    error.Code != "PasswordRequiresUpper")
                {
                    // Estos son errores generales, como nombre de usuario duplicado, etc.
                    generalMessages.Add(error.Description);
                }
            }

            return generalMessages;
        }

      
    }
}
