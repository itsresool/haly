using System.Text.Json.Serialization;

namespace Haly.WebApp;

public class SpotifyDtos
{
    public class PaginatedResponse<T>
    {
        public int Total { get; set; }
        public IEnumerable<T> Items { get; set; }
    }

    public class UserPlaylists
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [JsonPropertyName(("public"))] public bool IsPublic { get; set; }
    }
}
