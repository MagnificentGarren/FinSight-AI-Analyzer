using FinSightAPI.Infrastructure.Data;
using FinSightAPI.Infrastructure.Repositories; // Added this import
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// 1. Register the DbContext to use PostgreSQL
builder.Services.AddDbContext<FinSightDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Register the User Repository for Dependency Injection
builder.Services.AddScoped<IUserRepository, UserRepository>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();