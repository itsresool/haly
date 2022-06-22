using IdentityModel.Client;
using IdentityModel.OidcClient;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAccessTokenManagement();
var app = builder.Build();
var codeVerifier = "";

app.MapGet("/", () => "Hello World!");

app.MapGet("/login", async ([FromServices] IConfiguration config) =>
{
    var options = new OidcClientOptions()
    {
        Authority = "https://accounts.spotify.com",
        ClientId = config.GetValue<string>("Spotify:ClientId"),
        RedirectUri = config.GetValue<string>("Spotify:RedirectUri"),
        Scope = config.GetValue<string>("Spotify:Scope"),
    };
    var client = new OidcClient(options);
    var state = await client.PrepareLoginAsync();
    codeVerifier = state.CodeVerifier;

    return Results.Redirect(state.StartUrl);
});

app.MapGet("/login/callback", async ([FromServices] IConfiguration config, [FromQuery] string code) =>
{
    var client = new HttpClient();
    var request = new AuthorizationCodeTokenRequest()
    {
        Address = "https://accounts.spotify.com/api/token",
        ClientId = config.GetValue<string>("Spotify:ClientId"),
        ClientSecret = config.GetValue<string>("Spotify:ClientSecret"),
        RedirectUri = config.GetValue<string>("Spotify:RedirectUri"),
        Code = code,
        CodeVerifier = codeVerifier,
    };

    var response = await client.RequestAuthorizationCodeTokenAsync(request);
    client.RequestRefreshTokenAsync();
    Console.WriteLine($"Access token is {response.AccessToken}");
});

app.MapGet("/login/refresh", () =>
{
    // We will be notified 1 minute before the token expires
    // Refresh it and replace our tokens
    return Results.Ok();
});

app.Run();
