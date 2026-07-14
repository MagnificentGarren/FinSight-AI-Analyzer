using FinSightAPI.Api.DTOs;
using FinSightAPI.Domain.Entities;
using FinSightAPI.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FinSightAPI.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IUserRepository _userRepository;

        public ExpensesController(IExpenseRepository expenseRepository, IUserRepository userRepository)
        {
            _expenseRepository = expenseRepository;
            _userRepository = userRepository;
        }

        // POST api/expenses - Log a new expense
        [HttpPost]
        public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseDto dto)
        {
            // 1. Verify that the user exists
            var user = await _userRepository.GetByIdAsync(dto.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "Cannot log expense. User does not exist." });
            }

            // 2. Map DTO to Domain Entity
            var expense = new Expense
            {
                UserId = dto.UserId,
                Amount = dto.Amount,
                Category = dto.Category,
                Description = dto.Description,
                Date = dto.Date
            };

            // 3. Save to database
            await _expenseRepository.AddAsync(expense);
            var success = await _expenseRepository.SaveChangesAsync();

            if (!success)
            {
                return StatusCode(500, new { message = "An error occurred while saving the expense." });
            }

            return Ok(new { message = "Expense logged successfully!", expenseId = expense.Id });
        }

        // GET api/expenses/user/{userId} - Get all expenses for a user
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserExpenses(int userId)
        {
            var expenses = await _expenseRepository.GetByUserIdAsync(userId);
            return Ok(expenses);
        }
    }
}