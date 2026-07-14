using System.ComponentModel.DataAnnotations;

namespace FinSightAPI.Api.DTOs
{
    public class SetBudgetDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Limit must be greater than zero.")]
        public decimal Limit { get; set; }
    }
}