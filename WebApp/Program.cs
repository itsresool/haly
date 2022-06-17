var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/login", () =>
{
    
})

app.MapGet("/auth", () =>
{
});

app.Run();
