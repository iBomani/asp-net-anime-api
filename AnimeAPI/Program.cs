using AnimeAPI.Models;
using AnimeAPI.Services;

var builder = WebApplication.CreateBuilder(args);

//cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


// Add services to the container.
//anime mongodb database 
builder.Services.Configure<AnimeDatabaseSettings>(builder.Configuration.GetSection("AnimeDatabase"));

builder.Services.AddSingleton<AnimesService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

//cors
app.UseCors();

app.MapControllers();

app.Run();
