using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Configure Services
builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = "cookie";
        options.DefaultChallengeScheme = "oauth";
    })
    .AddCookie("cookie", options =>
    {
        options.Cookie.Name = "HalyOAuth";
        options.Cookie.SameSite = SameSiteMode.Lax;
    })
    .AddOAuth("oauth", options =>
    {
        var config = builder.Configuration;

        options.AuthorizationEndpoint = "https://accounts.spotify.com/authorize";
        options.TokenEndpoint = "https://accounts.spotify.com/api/token";
        options.ClientId = config.GetValue<string>("Spotify:ClientId");
        options.ClientSecret = config.GetValue<string>("Spotify:ClientSecret");
        options.UsePkce = true;
        options.CallbackPath = config.GetValue<string>("Spotify:RedirectUri");
        
        // Our app only runs on localhost using http, so default value of None does not work
        options.CorrelationCookie.SameSite = SameSiteMode.Lax;
        
        // Save tokens into authentication session
        options.SaveTokens = true;
        
        // Add scopes
        options.Scope.Clear();
        foreach (var scope in config.GetValue<string>("Spotify:Scope", "").Split(' '))
        {
           options.Scope.Add(scope); 
        }
    });

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
});

// Configure App
var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", async (HttpContext ctx) =>
{
    // var claims = ctx.User.Claims;
    var accessToken = await ctx.GetTokenAsync("oauth", "access_token");

    Console.WriteLine($"Your access token is: {accessToken}"); 

   return "Hello World";
});

app.MapGet("/bff/login", () => Results.Redirect("/"));
app.Run();
