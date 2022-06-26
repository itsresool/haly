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

// Configure App
var app = builder.Build();
app.UseCors();

app.MapGet("/playlist", async (HttpContext ctx, [FromServices] SpotifyService spotifyService) =>
{
    var accessToken = ctx.Request.Headers["x-haly-token"];
    
    var resp = await spotifyService.GetUserPlaylists(accessToken);

    if (resp != null)
    {
        Console.WriteLine(resp.Total);
    }

    return "Hello World";
});

app.MapGet("/bff/login", () => Results.Redirect("/"));
app.Run();
