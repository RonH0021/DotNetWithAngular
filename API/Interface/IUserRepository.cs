using API.DTOs;
using API.Entities;

namespace API.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUser>> GetUserAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberByIdAsync(int id);
        Task<MemberDto> GetMemberByUserNameAsync(string username);

        void Update(AppUser user);
        Task<bool> SaveAllAsync();
    }
}