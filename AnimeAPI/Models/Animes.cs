using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AnimeAPI.Models
{
    public class Animes
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string? Title { get; set; }
        [BsonElement("episodes")]
        public int Episodes { get; set; }
        [BsonElement("status")]
        public string? Status { get; set; }
        [BsonElement("rating")]
        [Range(1, 10)]
        public int Rating { get; set; }

        [BsonElement("imagePath")]
        public string? ImagePath { get; set; }

    }
}
