using Application.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;
using Persistence.DataSeeding;

var builder = WebApplication.CreateBuilder (args);

// Add services to the container.

builder.Services.AddControllers ();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer ();
builder.Services.AddSwaggerGen (options => {
    options.SwaggerDoc ("v1", new OpenApiInfo {
        Version = "v1",
            Title = "Work Time Logger API",
            Description = "An ASP.NET Core Web API for managing work time",
            Contact = new OpenApiContact {
                Name = "S�awek Kowal",
                    Email = "vanter2x@gmail.com"
            }
    });
});

builder.Services.AddDbContext<DataContext> (opt => {
    opt.UseSqlServer (builder.Configuration.GetConnectionString ("DefaultConnection"));
});

builder.Services.AddScoped<IDataGenerator, DataGenerator> ();
builder.Services.AddScoped<Seeder> ();

builder.Services.AddAutoMapper (AppDomain.CurrentDomain.GetAssemblies ());
builder.Services.AddMediatR (typeof (UserList.Handler));

builder.Services.AddCors (opt => {
    opt.AddPolicy ("CorsPolicy", policy => {
        policy.AllowAnyMethod ().AllowAnyHeader ().WithOrigins ("http://localhost:3001");
    });
});

var app = builder.Build ();

app.UseCors ("CorsPolicy");

// Configure the HTTP request pipeline.
var scope = app.Services.CreateScope ();
var seeder = scope.ServiceProvider.GetRequiredService<Seeder> ();

seeder.SeedData ();

if (app.Environment.IsDevelopment ()) {
    app.UseSwagger ();
    app.UseSwaggerUI (options => {
        options.SwaggerEndpoint ("/swagger/v1/swagger.json", "v1");
    });
}

app.UseAuthorization ();

app.MapControllers ();

app.Run ();