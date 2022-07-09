using Haly.WebApp.Services;
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
    var resp = await spotifyService.Client.GetAListOfCurrentUsersPlaylistsAsync(limit: 20, offset: 0);

    return resp?.Items;
});

app.MapGet("/playlist/{id}", async ([FromServices] SpotifyService spotifyService, string id) =>
{
    var resp = await spotifyService.Client.GetPlaylistAsync(id);

    return resp;
});

app.Run();
