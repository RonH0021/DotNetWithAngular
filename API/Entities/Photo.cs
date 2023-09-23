using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        //Adding Fully Qualified relationship to the AppUser entity 
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}