using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaymentsAPI.Data;
using PaymentsAPI.Models;
using PaymentsAPI.Utils;

namespace PaymentsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentsController(ApplicationDbContext context) 
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(User.Claims.First( c => c.Type == "id").Value);
        }

        [HttpGet("balance")]
        public IActionResult GetBalance()
        {
            var user = _context.Users.Find(GetUserId());
            return Ok(new { balance = user.Balance});
        }

        [HttpPost("send")]
        public IActionResult SendPayment([FromBody] Transaction tx)
        {
            if(!Validator.IsValidAccount(tx.RecipientAccount) || !Validator.IsValidAmount(tx.Amount.ToString()))
            return BadRequest("Invalid input");

            var user = _context.Users.Find(GetUserId());

            if(user.Balance < tx.Amount)
            return BadRequest("Insufficient funds");

            user.Balance -= tx.Amount;

            tx.UserId = user.UserId;
            _context.Transactions.Add(tx);

            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("history")]
        public IActionResult GetHistory()
        {
            var UserId = GetUserId();

            var history = _context.Transactions
            .Where(t => t.UserId ==  UserId)
            .ToList();

            return Ok(history);
        }
    }

}