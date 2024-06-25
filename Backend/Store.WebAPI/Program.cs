using System.Text;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Store.Mapper;
using Store.Repository;
using Store.Repository.Common;
using Store.Service;
using Store.Service.Common;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetSection("AppSettings").GetValue<String>("ConnectionString");

builder.Services.AddAutoMapper(typeof(ProductProfile), typeof(ReviewProfile));

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
    containerBuilder
        .RegisterType<ProductService>()
        .As<IProductService>()
        .InstancePerLifetimeScope();

    containerBuilder
        .RegisterType<ProductRepository>()
        .As<IProductRepository>()
        .InstancePerLifetimeScope();

    containerBuilder
        .RegisterType<ReviewService>()
        .As<IReviewService>()
        .InstancePerLifetimeScope();

    containerBuilder
        .RegisterType<ReviewRepository>()
        .As<IReviewRepository>()
        .InstancePerLifetimeScope();

    /*containerBuilder
        .RegisterType<GenreService>()
        .As<IGenreService>()
        .InstancePerLifetimeScope();

    containerBuilder
        .RegisterType<GenreRepository>()
        .As<IGenreRepository>()
        .InstancePerLifetimeScope();*/

    containerBuilder.RegisterInstance(connectionString).As<string>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

