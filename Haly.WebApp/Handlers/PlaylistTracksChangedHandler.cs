using Haly.WebApp.Notifications;
using MediatR;

namespace Haly.WebApp.Handlers;

public class PlaylistTracksChangedHandler : INotificationHandler<PlaylistTracksChanged>
{
    public Task Handle(PlaylistTracksChanged notification, CancellationToken cancellationToken)
    {
        Console.WriteLine($"Looks like i need to fetch all tracks for {notification.PlaylistId}");
        return Task.CompletedTask;
    }
}
