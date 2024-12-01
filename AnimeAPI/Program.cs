using AnimeAPI.Models;
using AnimeAPI.Services;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

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

//mongodb client
builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(builder.Configuration.GetSection("AnimeDatabase").GetValue<string>("ConnectionString")));

//mongodb database
builder.Services.AddSingleton<IMongoDatabase>(sp =>
    sp.GetRequiredService<IMongoClient>().GetDatabase("Animes"));

builder.Services.AddSingleton<IGridFSBucket>(sp =>
    new GridFSBucket(sp.GetRequiredService<IMongoDatabase>()));

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
