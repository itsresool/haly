namespace Haly.WebApp;

public class SpotifyService
{
    private readonly HttpClient _httpClient;

    public SpotifyService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.spotify.com");
    }

    public Task<SpotifyDtos.PaginatedResponse<SpotifyDtos.UserPlaylists>?> GetUserPlaylists(string accessToken)
    {
        _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", $"Bearer {accessToken}");

        return _httpClient.GetFromJsonAsync<SpotifyDtos.PaginatedResponse<SpotifyDtos.UserPlaylists>>(
            "/v1/me/playlists");
        
    }
}
