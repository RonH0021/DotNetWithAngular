using API.Extensions;
using API.Middleware;

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

app.Run();
