using Haly.WebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Data;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Playlist> Playlists { get; set; }
}
