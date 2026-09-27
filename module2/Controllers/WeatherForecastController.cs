using Microsoft.AspNetCore.Mvc;
using module2.ICalculation;

namespace MyWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculationController : ControllerBase
    {
        private readonly ICalculation _calculation;

        public CalculationController(ICalculation calculation)
        {
            _calculation = calculation;
        }

        [HttpGet("circle-area")]
        public IActionResult GetCircleArea([FromQuery] double radius)
        {
            try
            {
                var result = _calculation.AreaOfCircle(radius);
                return Ok(new { radius, area = result });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("sphere-volume/{radius}")]
        public IActionResult GetSphereVolume([FromRoute] int radius)
        {
            try
            {
                var result = _calculation.VolumeOfSphere(radius);
                return Ok(new { radius, volume = result });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("check-palindrome")]
        public IActionResult CheckPalindrome([FromBody] string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return BadRequest("Text cannot be empty.");
            }

            var isPalindrome = _calculation.Palindromes(text);
            return Ok(new { text, isPalindrome });
        }
    }
}
