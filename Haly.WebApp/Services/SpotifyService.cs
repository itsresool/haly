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

    public Task<SpotifyDtos.PaginatedResponse<SpotifyDtos.UserPlaylist>?> GetUserPlaylists()
    {
        return _httpClient.GetFromJsonAsync<SpotifyDtos.PaginatedResponse<SpotifyDtos.UserPlaylist>>(
            "/v1/me/playlists");
    }

    public Task<SpotifyDtos.Playlist?> GetPlaylist(string id)
    {
        return _httpClient.GetFromJsonAsync<SpotifyDtos.Playlist>($"/v1/playlists/{id}");
    }
}
