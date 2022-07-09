using System.Globalization;
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

    public record UserPlaylist
    {
        public string Id { get; init; }
        public string Name { get; init; }

        [JsonPropertyName("public")]
        public bool IsPublic { get; init; }

        public ApiDtos.Playlist Map() =>
            new()
            {
                Id = Id,
                Name = Name
            };
    }

    public record Playlist
    {
        public string Id { get; init; }
        public string Name { get; init; }
        public PaginatedResponse<TrackWrapper> Tracks { get; set; }
    }

    public record Artist
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public record Album
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Artist> Artists { get; set; }
    }

    public record TrackWrapper
    {
        public Track Track { get; set; }
    }

    public record Track
    {
        [JsonPropertyName("duration_ms")]
        [JsonInclude]
        public int DurationInMs { private get; set; }

        public string Id { get; set; }
        public string Name { get; set; }
        public Album Album { get; set; }
        public IEnumerable<Artist> Artists { get; set; }

        public string Duration => TimeSpan.FromMilliseconds(DurationInMs).ToString(@"mm\:ss", CultureInfo.InvariantCulture);
    }
}
