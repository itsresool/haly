using System.Text;
using Microsoft.AspNetCore.WebUtilities;

var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddCors(opts => opts.AddPolicy("AnyOrigin", o=> o.AllowAnyOrigin()));

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/v1/login", () =>
{
    var clientId = "db40997130f547a5a16b69a28c7326b9";
    var redirectUri = "http://localhost:5287/v1/login/callback";
    var scope = "playlist-read-private";

    var url = QueryHelpers.AddQueryString("https://accounts.spotify.com/authorize", new Dictionary<string, string?>()
    {
        { "response_type", "code" },
        { "client_id", clientId },
        { "redirect_uri", redirectUri },
        { "scope", scope }
    });
    return Results.Redirect(url);
});

app.MapGet("v1/login/callback", async (ctx) =>
{
    var clientId = "db40997130f547a5a16b69a28c7326b9";
    var clientSecret = "e6aaa15109874f948ed511536f81c7ba";

    var code = ctx.Request.Query["code"];
    var authData = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));

    var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Add("Authorization", $"Basic {authData}");
    var resp = await httpClient.PostAsync("https://accounts.spotify.com/api/token", new FormUrlEncodedContent(
        new Dictionary<string, string?>()
        {
            { "grant_type", "authorization_code" },
            { "code", code },
            { "redirect_uri", "http://localhost:5287/v1/login/callback" },
        }));

    resp.EnsureSuccessStatusCode();
    var json = resp.Content.ReadFromJsonAsync<object>();
});

app.Run();
