using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")] //POST : api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            //Check if User Already Exists
            if(await UserExist(registerDto.UserName))
                return BadRequest("UserName already in use");

            //Initializes a new instance of the HMACSHA512 class with a randomly generated key
            //We will use this randomly generated key as our salt
            //We have 'using' because the base class of HMACSHA512 implementes the IDisposable interface
            //When we have 'using' the instance is discarded as soon as it is not in use
            using var hmac = new HMACSHA512();

            var user = new AppUser()
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)), //First the plain text password is converted into bytes which is then converted into hash by ComputeHash
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login (LoginDto loginDto)
        {
            //Get user from database, if no matching users are returned then send unauth response
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if(user ==null ) return Unauthorized("Invalid UserName");

            //The user has provided password as string, and in our db we have the passwordSalt
            //Using the password salt as the key we can initialize the hmac instance
            var hmac = new HMACSHA512(user.PasswordSalt);

            //Now that we have our HMAC with key, to it we provide our password as byte array
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            //No compare this Computed array against the passwordSalt present in our db
            //If both are same then input password matches that present in db
            for(int i = 0; i < computedHash.Length ; i++)
            {
                if(computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid Password");
                }
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExist(string userName)
        {
            //This will check if the user already exists in the db and return true if it does
            return await _context.Users.AnyAsync(user => user.UserName == userName.ToLower());
        }
    }
}