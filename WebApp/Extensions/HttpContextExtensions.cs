namespace Haly.WebApp.Extensions;

public static class HttpContextExtensions
{
    public static string GetHalyToken(this HttpContext context)
    {
        return context.Request.Headers["x-haly-token"];
    }
}
