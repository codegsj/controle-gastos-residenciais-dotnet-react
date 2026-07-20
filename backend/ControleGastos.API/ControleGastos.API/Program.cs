using ControleGastos.API.Data;
using ControleGastos.API.Middleware;
using ControleGastos.API.Services;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace ControleGastos.API
{
    public class Program
    {
        public static void Main(string[] args)
        {

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()

                .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)

                .MinimumLevel.Override("Microsoft.EntityFrameworkCore", Serilog.Events.LogEventLevel.Error)

                .WriteTo.File(
                    "Logs/log-.txt",
                     rollingInterval: RollingInterval.Day
                 )
                .CreateLogger();

            try
            {
                Log.Information("Iniciando a aplicação Controle de Gastos.");


                var builder = WebApplication.CreateBuilder(args);

                // permite comunicação entre o frontend React e a API
                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("frontend", policy =>
                    {
                        policy
                            .WithOrigins("http://localhost:5173")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
                });

                builder.Host.UseSerilog();


                builder.Services.AddDbContext<ApplicationDbContext>(options => // Configuração do contexto do banco de dados para utilizar o SQL Server
                    options.UseSqlServer(
                        builder.Configuration.GetConnectionString("DefaultConnection")));


                builder.Services.AddScoped<PessoaService>(); // injeção de dependência para utilizar o serviço PessoaService
                builder.Services.AddScoped<TransacaoService>(); // injeção de dependência para utilizar o serviço TransacaoService
                builder.Services.AddScoped<RelatorioService>(); // injeção de dependência para utilizar o serviço RelatorioService


                builder.Services.AddControllers() // injeção de dependência para utilizar o serviço de controllers 
                        .AddJsonOptions(options =>
                        {
                            options.JsonSerializerOptions.ReferenceHandler =
                             System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                        });


                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();


                var app = builder.Build();


                app.UseMiddleware<ExceptionMiddleware>();


                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }


                app.UseHttpsRedirection();

                app.UseCors("frontend");  // habilita o CORS para permitir comunicação entre o frontend React e a API

                app.UseAuthorization();


                app.MapControllers();


                Log.Information("Aplicação Controle de Gastos iniciada com sucesso.");


                app.Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "A aplicação foi encerrada inesperadamente.");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}