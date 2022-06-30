using Haly.WebApp;
using Microsoft.AspNetCore.Mvc;

// Configure Services
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
{
    policy.AllowAnyOrigin();
    policy.AllowAnyHeader();
}));
builder.Services.AddHttpClient<SpotifyService>();
builder.Services.AddHttpContextAccessor();

// Configure App
var app = builder.Build();
app.UseCors();
if (app.Environment.IsProduction())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.MapGet("/playlist", async ([FromServices] SpotifyService spotifyService) =>
{
    var resp = await spotifyService.GetUserPlaylists();

    return resp?.Items.Select(i => i.Map());
});

app.MapGet("/hello", () =>
{
    Console.WriteLine("hello");
    return "Hello World";
});
app.Run();
