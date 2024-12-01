using AnimeAPI.Models;
using AnimeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;

namespace AnimeAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AnimesController : ControllerBase
{
    private readonly AnimesService _animesService;
    private readonly IGridFSBucket _gridFSBucket;

    public AnimesController(AnimesService animesService, IGridFSBucket gridFSBucket)
    {
        _animesService = animesService;
        _gridFSBucket = gridFSBucket;

    }

    [HttpGet]
    public ActionResult<List<Animes>> Get() =>
        _animesService.Get();

    [HttpGet("{id:length(24)}", Name = "GetAnime")]
    public ActionResult<Animes> Get(string id)
    {
        var anime = _animesService.Get(id);

        if (anime == null)
        {
            return NotFound();
        }

        return anime;
    }

    [HttpGet("image/{fileId}")]
    public async Task<IActionResult> GetImage(string fileId)
    {
        if (_gridFSBucket == null)
        {
            Console.WriteLine("_gridFSBucket is null");
            throw new InvalidOperationException("gridfsbucket is not initialized");
        }

        var fileStream = await _gridFSBucket.OpenDownloadStreamAsync(new ObjectId(fileId));
        return File(fileStream, "image/jpeg");
    }

    [HttpPost]
    public ActionResult<Animes> Create(Animes anime)
    {
        _animesService.Create(anime);

        return CreatedAtRoute("GetAnime", new { id = anime.Id.ToString() }, anime);
    }

    //kepek miatt
    [HttpPost("upload")]
    public async Task<IActionResult> UploadAnime([FromForm] IFormFile imagePath, [FromForm] string title, [FromForm] int episodes, [FromForm] string status, [FromForm] int rating)
    {
        if (imagePath == null)
        {
            Console.WriteLine("imageFile is null");
            throw new ArgumentNullException(nameof(imagePath), "Image File cannot be null.");
        }

        if (_gridFSBucket == null)
        {
            Console.WriteLine("_gridFSBucket is null");
            throw new InvalidOperationException("gridfsbucket is not initialized");
        }

        // Save the image file to GridFS
        var fileId = await _gridFSBucket.UploadFromStreamAsync(imagePath.FileName, imagePath.OpenReadStream());

        // Create a new anime object and set its properties
        var anime = new Animes
        {
            Title = title,
            Episodes = episodes,
            Status = status,
            Rating = rating,
            ImagePath = fileId.ToString() // Store the GridFS file ID as the image path
        };

        // Insert the new anime into MongoDB
        _animesService.Create(anime);

        return CreatedAtAction(nameof(UploadAnime), new { id = anime.Id.ToString() }, anime);
    }

    [HttpPut("{id:length(24)}")]
    public IActionResult Update(string id, Animes animeIn)
    {
        var anime = _animesService.Get(id);

        if (anime == null)
        {
            return NotFound();
        }

        _animesService.Update(id, animeIn);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public IActionResult Delete(string id)
    {
        var anime = _animesService.Get(id);

        if (anime == null)
        {
            return NotFound();
        }

        _animesService.Remove(anime.Id);

        return NoContent();
    }


}
