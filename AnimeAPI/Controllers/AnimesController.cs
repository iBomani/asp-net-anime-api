using AnimeAPI.Models;
using AnimeAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimeAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AnimesController : ControllerBase
{
    private readonly AnimesService _animesService;

    public AnimesController(AnimesService animesService)
    {
        _animesService = animesService;
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

    [HttpPost]
    public ActionResult<Animes> Create(Animes anime)
    {
        _animesService.Create(anime);

        return CreatedAtRoute("GetAnime", new { id = anime.Id.ToString() }, anime);
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
