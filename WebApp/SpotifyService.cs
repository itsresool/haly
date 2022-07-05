using System.Net.Http.Headers;
using Haly.WebApp.Extensions;

namespace Haly.WebApp;

public class SpotifyService
{
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SpotifyService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor)
    {
        _httpClient = httpClient;
        _httpContextAccessor = httpContextAccessor;

        _httpClient.BaseAddress = new("https://api.spotify.com");

        // GetHalyToken returns an access token for Spotify's API
        var accessToken = httpContextAccessor.HttpContext!.GetHalyToken();
        _httpClient.DefaultRequestHeaders.Authorization = new("Bearer", accessToken);
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
