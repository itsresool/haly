using MediatR;

namespace Haly.WebApp.Notifications;

public class PlaylistTracksChanged : INotification
{
    public string PlaylistId { get; }

    public PlaylistTracksChanged(string playlistId)
    {
        PlaylistId = playlistId;
    }
}
