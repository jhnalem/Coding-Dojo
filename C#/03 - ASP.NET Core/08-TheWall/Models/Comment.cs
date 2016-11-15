using System;
using System.ComponentModel.DataAnnotations;

namespace TheWall.Models
{
    public class Comment : BaseEntity
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public User User { get; set; }
        public Message Message { get; set; }
    }
}