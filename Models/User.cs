namespace PaymentsAPI.Models
{
    public class User
    {
        public int UserId { get; set;}
        public string UserName { get; set;}
        public string UserEmail { get; set;}
        public string PasswordHash { get; set;}
        public string? AccountNumber { get; set; }
        public decimal Balance { get; set; } //default balance

    }
}