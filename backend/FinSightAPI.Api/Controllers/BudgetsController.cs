using FinSightAPI.Api.DTOs;
using FinSightAPI.Domain.Entities;
using FinSightAPI.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FinSightAPI.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetsController : ControllerBase
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly IUserRepository _userRepository;

        public BudgetsController(IBudgetRepository budgetRepository, IUserRepository userRepository)
        {
            _budgetRepository = budgetRepository;
            _userRepository = userRepository;
        }

        // POST api/budgets - Set or update a budget limit
        [HttpPost]
        public async Task<IActionResult> SetBudget([FromBody] SetBudgetDto dto)
        {
            // 1. Verify user exists
            var user = await _userRepository.GetByIdAsync(dto.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "Cannot set budget. User does not exist." });
            }

            // 2. Check if a budget already exists for this user and category
            var existingBudget = await _budgetRepository.GetByUserAndCategoryAsync(dto.UserId, dto.Category);

            if (existingBudget != null)
            {
                // Map to your entity's TargetAmount property
                existingBudget.TargetAmount = dto.Limit; 
                
                var updateSuccess = await _budgetRepository.SaveChangesAsync();
                if (!updateSuccess)
                {
                    return StatusCode(500, new { message = "An error occurred while updating the budget." });
                }

                return Ok(new { message = "Budget updated successfully!", budgetId = existingBudget.Id });
            }

            // 3. If it doesn't exist, create a brand-new category budget
            var newBudget = new Budget
            {
                UserId = dto.UserId,
                Category = dto.Category,
                TargetAmount = dto.Limit, // Mapped to TargetAmount
                StartDate = DateTime.UtcNow, // Required by your entity
                EndDate = DateTime.UtcNow.AddMonths(1) // Defaults to a 1-month budget window
            };

            await _budgetRepository.AddAsync(newBudget);
            var success = await _budgetRepository.SaveChangesAsync();

            if (!success)
            {
                return StatusCode(500, new { message = "An error occurred while saving the budget." });
            }

            return Ok(new { message = "Budget set successfully!", budgetId = newBudget.Id });
        }

        // GET api/budgets/user/{userId} - Retrieve all budgets for a user
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserBudgets(int userId)
        {
            var budgets = await _budgetRepository.GetByUserIdAsync(userId);
            return Ok(budgets);
        }
    }
}