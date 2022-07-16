using Haly.WebApp.Data;
using Haly.WebApp.Extensions;
using Haly.WebApp.Models;
using Haly.WebApp.Notifications;
using Haly.WebApp.Services;
using MediatR;
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
builder.Services.AddMediatR(typeof(Program));

// Configure App
var app = builder.Build();
app.UseCors();
if (app.Environment.IsProduction())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.MapPut("/users/me",
    async ([FromServices] SpotifyService spotifyService, [FromServices] LibraryContext db) =>
    {
        var me = await spotifyService.Client.GetCurrentUsersProfileAsync();
        var user = new User
        {
            Id = me.Id,
            Name = me.Display_name,
            Market = me.Country,
            Plan = me.Product == "premium" ? Plan.Premium : Plan.Free,
        };
        var foundUser = await db.Users.FindAsync(user.Id);

        if (foundUser is null)
        {
            await db.Users.AddAsync(user);
            return Results.Created($"/users/{user.Id}", user);
        }

        db.Users.Update(user);
        await db.SaveChangesAsync();

        return Results.Ok(user);
    });

app.MapGet("/users/{id}",
    ([FromServices] SpotifyService spotifyService, [FromServices] LibraryContext db, string id) =>
        db.Users.FindAsync(id));

app.MapPut("/users/{id}/playlists",
    async ([FromServices] SpotifyService spotifyService, [FromServices] LibraryContext db,
        [FromServices] IMediator mediator, [FromQuery] string id) =>
    {
        var resp = await spotifyService.Client.GetAListOfCurrentUsersPlaylistsAsync(limit: 20, offset: 0);
        var user = await db.FindAsync<User>(id);

        var newPlaylists = new List<Playlist>();
        foreach (var item in resp.Items)
        {
            var newVersion = new Playlist
            {
                Id = item.Id,
                Name = item.Name,
                SnapshotId = item.Snapshot_id,
            };
            var oldVersion = user!.Playlists.Find(p => p.Id == newVersion.Id);
            if (oldVersion is null || oldVersion.SnapshotId != newVersion.SnapshotId)
            {
                await mediator.Publish(new PlaylistTracksChanged(newVersion.Id));
            }

            newVersion.Tracks = oldVersion?.Tracks ?? new List<Track>();
            newPlaylists.Add(newVersion);
        }

        user!.Playlists = newPlaylists;

        // our client will show when user is browsing stale playlist
        // when the tracks are updated, client will receive a message PlaylistTracksSynced and fetch GET /playlists/{id}/tracks

        return user.Playlists;
    });


app.MapGet("/playlist/{id}",
    ([FromServices] SpotifyService spotifyService, [FromServices] LibraryContext db, string id) =>
        db.Playlists.FindAsync(id));

app.ApplyMigrations();
app.Run();
