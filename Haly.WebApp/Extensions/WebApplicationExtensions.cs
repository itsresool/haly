using Haly.WebApp.Data;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Extensions;

public static class WebApplicationExtensions
{
    public static void ApplyMigrations(this WebApplication app)
    {
        var serviceScopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();
        using var serviceScope = serviceScopeFactory.CreateScope();
        using var db = serviceScope.ServiceProvider.GetRequiredService<LibraryContext>();
        db.Database.Migrate();
    }
}
