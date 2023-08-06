using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    //This is tell our system how to authenticate the tokens using rules
                    options.TokenValidationParameters= new TokenValidationParameters
                    {
                        //This is important because the system will check if the token is signed by the issuer
                        //if we dont enable this then any random jtw token will be accepted as valid
                        ValidateIssuerSigningKey = true,

                        //This tells the system what the issuer signing key is,
                        //We are getting the key from config and using Symmetric Security Key to generate 
                        //signing key
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),

                        ValidateIssuer = false, //The issuer is our own api server but we are not sending back the validation details with the jtw token hence keep this off same with audience
                        ValidateAudience = false
                    };
                });

            return services;
        }   
    }
}