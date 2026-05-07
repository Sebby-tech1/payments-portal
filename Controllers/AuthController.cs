using Microsoft.AspNetCore.Mvc;
using PaymentsAPI.Data;
using PaymentsAPI.Models;
using PaymentsAPI.Services;
using PaymentsAPI.Utils;
using BC = BCrypt.Net.BCrypt;

namespace PaymentsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwt;

        public AuthController(ApplicationDbContext context, JwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            if(!Validator.IsValidEmail(user.UserEmail) || !Validator.IsValidName(user.UserName)
            || !Validator.IsValidPassword(user.PasswordHash)) 
            return BadRequest("Invalid input");
            

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.AccountNumber = Guid.NewGuid().ToString("N").Substring(0, 10);
            user.Balance = 1000.00m;
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok();
        }
        public class LoginDto
        {
            public string UserEmail { get; set; }
            public string PasswordHash { get; set; }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto login)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserEmail == login.UserEmail);
            if(user == null || !BCrypt.Net.BCrypt.Verify(login.PasswordHash, user.PasswordHash))
            return Unauthorized();


            var token = _jwt.GenerateToken(user);
            return Ok(new { token });
        }
    }

    }
