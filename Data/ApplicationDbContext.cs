using Microsoft.EntityFrameworkCore;
using PaymentsAPI.Models;

namespace PaymentsAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) {}

        public DbSet<User> Users {get; set;}
        public DbSet<Transaction> Transactions {get; set;}
    }
}