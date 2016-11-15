using System;
using System.ComponentModel.DataAnnotations;

namespace QuotingDojo.Models
{
    public abstract class BaseEntity {}
    public class Quote : BaseEntity
    {
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        public string Text { get; set; }

        public int Likes { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}