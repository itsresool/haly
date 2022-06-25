var builder = WebApplication.CreateBuilder(args);

// Configure Services
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
{
    policy.AllowAnyOrigin();
    policy.AllowAnyHeader();
}));

// Configure App
var app = builder.Build();
app.UseCors();

app.MapGet("/playlist", async (HttpContext ctx) =>
{
    Console.WriteLine(ctx.Request.Headers["x-halytoken"]);
    return "Hello World";
});

app.MapGet("/bff/login", () => Results.Redirect("/"));
app.Run();
