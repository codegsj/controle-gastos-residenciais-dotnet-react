using ControleGastos.API.Data;
using ControleGastos.API.Services;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args); //  injeção de dependência para utilizar SQL SERVER 
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<PessoaService>(); // injeção de dependência para utilizar o serviço PessoaService
            builder.Services.AddScoped<TransacaoService>(); // injeção de dependência para utilizar o serviço TransacaoService

            builder.Services.AddControllers() // injeção de dependência para utilizar o serviço de controllers 
                    .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.ReferenceHandler = 
                         System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                    });





            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
