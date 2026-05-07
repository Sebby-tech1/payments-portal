namespace PaymentsAPI.Models
{
    public class Transaction
    {
        public int UserId { get; set;}
        public int Id {get; set;}
        public string RecipientAccount { get; set;}
        public decimal Amount {get; set;}
        public DateTime Date {get; set;} = DateTime.UtcNow;
    }
}