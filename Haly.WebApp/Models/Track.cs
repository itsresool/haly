namespace Haly.WebApp.Models;

public class Track
{
    public string Id { get; set; }
    public string Name { get; set; }
    public int DurationInMs { get; set; }

    public string PlaylistId { get; set; }
    public Playlist Playlist { get; set; }
}
