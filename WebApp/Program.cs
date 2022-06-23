// Configure Services
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddBff();
builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = "cookie";
        options.DefaultChallengeScheme = "oauth";
        options.DefaultSignOutScheme = "oauth";
    })
    .AddCookie("cookie", options =>
    {
        options.Cookie.Name = "__Host-bff";
        // options.Cookie.SameSite = SameSiteMode.Strict;
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
        
        // save tokens into authentication session
        // to enable automatic token management
        options.SaveTokens = true;
        
        // Add scopes
        options.Scope.Clear();
        foreach (var scope in config.GetValue<string>("Spotify:Scope", "").Split(' '))
        {
           options.Scope.Add(scope); 
        }
    });
builder.Services.AddAuthorization();

// Configure App
var app = builder.Build();
app.UseAuthentication();
app.UseRouting();
app.UseBff();
app.UseAuthorization();
app.MapBffManagementEndpoints();

app.MapGet("/", () => "Hello World!");

app.Run();
