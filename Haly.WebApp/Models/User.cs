namespace Haly.WebApp.Models;

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }

    public ICollection<Playlist> Playlists { get; set; }
}
