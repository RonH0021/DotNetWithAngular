using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interface;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        //This is the Security key which our application will use to generate the JWT token
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            //Security key is generated using the TokenKey which will be present in our appsettings.json file
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            //We are creating a list of Tye Claims
            //Claims are what the user say they are
            //In this example the UserName is linked to the JWT Name
            //There can be multiple claims hece we have created a list
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };

            //Create Credentials
            var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);

            //Describe the token which we are going to return
            var tokenDescriptordescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims), //Subject contains the Claims
                Expires = DateTime.Now.AddDays(7), //When will the token expire
                SigningCredentials = creds // Signing credentials which we created with help of the key
            };

            //Create token handler which will actually create and token and help in returning it
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateJwtSecurityToken(tokenDescriptordescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}