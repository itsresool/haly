using System.Text.Json.Serialization;

namespace Haly.WebApp;

public record SpotifyDtos
{
    public record PaginatedResponse<T>
    {
        public PaginatedResponse(int total, IEnumerable<T> items)
        {
            Total = total;
            Items = items;
        }

        public int Total { get; init; }
        public IEnumerable<T> Items { get; init; }
    }

    public record UserPlaylists
    {
        public string Id { get; init; }

        public string Name { get; init; }

        [JsonPropertyName("public")]
        public bool IsPublic { get; init; }

        public ApiDtos.Playlist Map()
        {
            return new()
            {
                Id = Id,
                Name = Name,
            };
        }
    }
}
