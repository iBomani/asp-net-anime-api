using AnimeAPI.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace AnimeAPI.Services
{
    public class AnimesService
    {
        private readonly IMongoCollection<Animes> _animes;

        public AnimesService(IOptions<AnimeDatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _animes = database.GetCollection<Animes>(settings.Value.CollectionName);
        }

        public List<Animes> Get() =>
            _animes.Find(anime => true).ToList();

        public Animes Get(string id) =>
            _animes.Find<Animes>(anime => anime.Id == id).FirstOrDefault();

        public Animes Create(Animes anime)
        {
            _animes.InsertOne(anime);
            return anime;
        }

        public void Update(string id, Animes animeIn) =>
            _animes.ReplaceOne(anime => anime.Id == id, animeIn);

        public void Remove(Animes animeIn) =>
            _animes.DeleteOne(anime => anime.Id == animeIn.Id);

        public void Remove(string id) =>
            _animes.DeleteOne(anime => anime.Id == id);
    }
}
