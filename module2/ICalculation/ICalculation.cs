using System;

namespace module2.ICalculation
{
    public interface ICalculation
    {
        double AreaOfCircle(double radius);
        double VolumeOfSphere(int radius);
        bool Palindromes(string text);
    }

    public class Calculation : ICalculation
    {
        public double AreaOfCircle(double radius)
        {
            if (radius < 0)
            {
                throw new ArgumentException("Radius cannot be negative.");
            }
            return Math.PI * radius * radius;
        }

        public double VolumeOfSphere(int radius)
        {
            if (radius < 0)
            {
                throw new ArgumentException("Radius cannot be negative.");
            }
            return (4.0 / 3.0) * Math.PI * Math.Pow(radius, 3);
        }

        public bool Palindromes(string text)
        {
            if (string.IsNullOrEmpty(text)) return false;
            string cleaned = text.ToLower();
            char[] arr = cleaned.ToCharArray();
            Array.Reverse(arr);
            string reversed = new string(arr);
            return cleaned == reversed;
        }
    }
}
