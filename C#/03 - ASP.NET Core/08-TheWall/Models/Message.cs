using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheWall.Models
{
    public class Message : BaseEntity
    {
        public Message()
        {
            Comments = new List<Comment>();
        }

        [Key]
        public int Id { get; set; }


        [Required]
        public string Text { get; set; }


        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public User User { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}