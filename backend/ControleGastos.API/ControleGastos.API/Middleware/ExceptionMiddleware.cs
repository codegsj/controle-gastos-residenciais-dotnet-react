using System.Net;
using System.Text.Json;
using ControleGastos.API.Exceptions;

namespace ControleGastos.API.Middleware
{
    public class ExceptionMiddleware // Middleware para tratamento de exceções globais na aplicação
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;


        public ExceptionMiddleware(
            RequestDelegate next,
            ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }


        public async Task InvokeAsync(HttpContext context) // método que intercepta as requisições HTTP e trata as exceções lançadas durante o processamento
        {
            try
            {
                await _next(context);
            }
            catch (NotFoundException ex)
            {
                await HandleExceptionAsync(
                    context,
                    HttpStatusCode.NotFound,
                    ex.Message);
            }
            catch (BusinessException ex)
            {
                await HandleExceptionAsync(
                    context,
                    HttpStatusCode.BadRequest,
                    ex.Message);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync( // trata exceções não tratadas, retornando um status code 500 (Internal Server Error) e registrando o erro no log
                    context,
                    HttpStatusCode.InternalServerError,
                    "Ocorreu um erro interno no servidor.");

                _logger.LogError(
                    ex,
                    "Erro interno não tratado na aplicação. Endpoint: {Endpoint}",
                    context.Request.Path);
            }
        }


        private async Task HandleExceptionAsync( // método auxiliar para tratar exceções e retornar uma resposta JSON com o status code e a mensagem de erro
            HttpContext context,
            HttpStatusCode statusCode,
            string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;


            var response = new
            {
                statusCode = context.Response.StatusCode,
                message = message,
                timestamp = DateTime.UtcNow
            };

             
            _logger.LogWarning( // registra uma mensagem de log de aviso com informações sobre a requisição que gerou a exceção
                "Requisição finalizada com erro. StatusCode: {StatusCode}, Endpoint: {Endpoint}, Mensagem: {Message}",
                context.Response.StatusCode,
                context.Request.Path,
                message);


            var json = JsonSerializer.Serialize(response);


            await context.Response.WriteAsync(json);
        }
    }
}