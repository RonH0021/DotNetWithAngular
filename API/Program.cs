using API.Data;
using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);


var app = builder.Build();

// Configure the HTTP request pipeline. - Start of the Request Pipeline

//The exception middleware must be at the start of the request pipeline
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

//These two middleware components must be used after CORS but before the map controller component 
//And in the below order only
app.UseAuthentication(); //To check if user has valid Token
app.UseAuthorization(); //To check if authenticated user has authority to access resource

app.MapControllers();

//Use the scope to get all the services which is present in this application
using var scope = app.Services.CreateScope();
var services  = scope.ServiceProvider;

try
{
    //Get the DataContext Service and then send that to our SeedUser Method
    var context = services.GetRequiredService<DataContext>();
    //Asynchronously applies any pending migrations for the context to the database. Will create the database if it does not already exist.
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"An Error Occurred during Migration");
}

app.Run();
