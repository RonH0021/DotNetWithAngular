using API.Data;
using API.Interface;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    //This will be a static class since we want to use it in the program.cs without creating an object
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();

            //When we add our custom service we need to tell the application the lifespan.
            //There are 3 options - AddTransient - This disposes the instance of the service as soon as it is finished being used
            // Add Singleton - This creates the instance of the service and keeps it alive as soon as the applicaiton is running
            //Add Scoped - This disposes the instance of the service as soon as the scope in which it was used ends
            //For API services AddScoped is the best option
            //We specify the interface and its implementation because it helps in unit testing
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}