using System;
using System.ComponentModel.DataAnnotations;

namespace QuotingDojoRedux.Models
{
    public class Quote : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public User User { get; set; }
    }
}