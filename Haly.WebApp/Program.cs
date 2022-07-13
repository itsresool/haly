using Haly.WebApp.Data;
using Haly.WebApp.Extensions;
using Haly.WebApp.Models;
using Haly.WebApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// Configure Services
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
{
    policy.AllowAnyOrigin();
    policy.AllowAnyHeader();
}));
builder.Services.AddHttpClient<SpotifyService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<LibraryContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("LibraryConnection"));
});

// Configure App
var app = builder.Build();
app.UseCors();
if (app.Environment.IsProduction())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.MapGet("/me",
    async ([FromServices] SpotifyService spotifyService, [FromServices] LibraryContext db, [FromQuery] string userId) =>
    {
        var user = await db.FindAsync<User>(userId);
        if (user is null)
        {
            var newUser = new User
            {
                Id = userId,
                Name = "Unknown",
            };
            await db.Users.AddAsync(newUser);
        }
    });

app.MapGet("/me/playlists",
    async ([FromServices] SpotifyService spotifyService, [FromServices] LibraryContext db, [FromQuery] string userId) =>
    {
        var user = await db.FindAsync<User>(userId);

        // fetch their playlists
        // update our user with them
        // then for each one of their playlists, try to find a matching one in ours
        // if found and snapshot_id is same, move our tracks to theirs
        // else make tracks empty [TODO: and send a cmd to fetch those tracks to our worker]

        // this only calls spotifyServices and returns its result
        // then we have another endpoint that the client calls to:
        // POST /cache/playlists, this fills our cache and starts our worker on adding tracks
        // either we request some idempotent key from the client, or the client has to ensure this is called once
        // or the worker gets a GET TRACKS + snapshot_id and only one job of this type can exist

        if (user!.Playlists.Count == 0)
        {
            var resp = await spotifyService.Client.GetAListOfCurrentUsersPlaylistsAsync(limit: 20, offset: 0);
            user.Playlists = resp.Items.Select(p => new Playlist
            {
                Id = p.Id,
                Name = p.Name,
            })
                .ToList();

            await db.SaveChangesAsync();
            return user.Playlists;
        }

        return user.Playlists;
    });

app.MapGet("/playlist/{id}", async ([FromServices] SpotifyService spotifyService, string id) =>
{
    var resp = await spotifyService.Client.GetPlaylistAsync(id);

    return resp;
});

app.ApplyMigrations();
app.Run();
