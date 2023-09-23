using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            //first check if the database context has any users already present
            //If any users are already present the end execution of method
            if(await context.Users.AnyAsync()) return;

            //Read the SeedData Json as text
            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            //Before starting the Json Desrialize, set the options for json deserilization
            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive= true};

            //Descerialize the json data using json serilization
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            //Now to set the password for each user
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;
                await context.Users.AddAsync(user);
            }
            await context.SaveChangesAsync();
        }
    }
}