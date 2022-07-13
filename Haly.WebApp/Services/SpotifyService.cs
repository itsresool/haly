using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Extensions;

namespace Haly.WebApp.Services;

public class SpotifyService
{
    private readonly HttpClient _httpClient;
    public SpotifyClient Client { get; }

    public SpotifyService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor)
    {
        _httpClient = httpClient;

        // GetHalyToken returns an access token for Spotify's API
        var accessToken = httpContextAccessor.HttpContext!.GetHalyToken();
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        Client = new SpotifyClient(_httpClient);
    }
}
