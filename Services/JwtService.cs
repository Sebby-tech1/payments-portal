using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PaymentsAPI.Models;

namespace PaymentsAPI.Services
{
    public class JwtService
    {
        private readonly string key = "SUPER_SECRET_KEY_12345_PADDING_32X";

        public string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim("id", user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.UserEmail)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = credentials
            };

            var handler = new JwtSecurityTokenHandler();
            return handler.CreateEncodedJwt(tokenDescriptor);
        }
    }
}