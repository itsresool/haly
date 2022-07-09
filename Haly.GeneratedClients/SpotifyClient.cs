using System;
using System.Runtime.Serialization;
using Newtonsoft.Json.Serialization;

namespace Haly.GeneratedClients
{
    public partial class SpotifyClient
    {
    }

    public partial class TrackObject
    {
        // Hacky way to get around properties in spec that don't have nullable:true specified
        // If there are more objects like this, fix this in spec file
        [OnError]
        internal void OnError(StreamingContext context, ErrorContext errorContext)
        {
            errorContext.Handled = true;
            Console.WriteLine($"Member {errorContext.Member} failed deserialization. Path: {errorContext.Path}");
        }
    }
}
