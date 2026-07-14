using FinSightAPI.Api.DTOs;
using FinSightAPI.Domain.Entities;
using FinSightAPI.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FinSightAPI.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // 1. Check if user already exists
            var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Email is already registered." });
            }

            // 2. Create the user entity (Note: In production, you would hash this password)
            var newUser = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = dto.Password, // Stored directly for initial verification
                CreatedAt = DateTime.UtcNow
            };

            // 3. Add to repository and commit changes
            await _userRepository.AddAsync(newUser);
            var success = await _userRepository.SaveChangesAsync();

            if (!success)
            {
                return StatusCode(500, new { message = "An error occurred while saving the user." });
            }

            return Ok(new { message = "User registered successfully!" });
        }
    }
}