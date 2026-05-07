using System.Text.RegularExpressions;

namespace PaymentsAPI.Utils
{
    public static class Validator
    {
        public static bool IsValidEmail(string email)
        => Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$");

        public static bool IsValidName(string name)
        => name.Length >= 2;
        //=> Regex.IsMatch(name, @"^[A-Za-z ] {2,50}$");

        public static bool IsValidPassword(string password)
        => password.Length >= 6;
       // => Regex.IsMatch(password, @"^(?=.*[A-Z])(?=.*\d).{8,}$");

        public static bool IsValidAmount(string amount)
        => Regex.IsMatch(amount, @"^\d+(\.\d{1,2})?$");

        public static bool IsValidAccount(string acc)
        => Regex.IsMatch(acc, @"^[0-9]{10,12}$");
    }
}