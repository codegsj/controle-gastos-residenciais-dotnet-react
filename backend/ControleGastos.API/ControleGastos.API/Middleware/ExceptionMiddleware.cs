using System.Net;
using System.Text.Json;

namespace ControleGastos.API.Middleware
{
    public class ExceptionMiddleware // Middleware para tratamento de exceções globais na aplicação
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next) 
        {
            _next = next;
        }


        public async Task InvokeAsync(HttpContext context) // método que intercepta as requisições HTTP e trata as exceções lançadas durante o processamento
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }


        private static async Task HandleExceptionAsync( // método que trata a exceção lançada e retorna uma resposta HTTP com o status code e a mensagem de erro
            HttpContext context,
            Exception exception)
        {
            context.Response.ContentType = "application/json";


            var response = new
            {
                statusCode = context.Response.StatusCode,
                message = exception.Message,
                timestamp = DateTime.UtcNow
            };


            var json = JsonSerializer.Serialize(response);


            await context.Response.WriteAsync(json);
        }
    }
}

/* middleware é para coisas inesperadas
banco cair
erro no código
falha de conexão
exceção não tratada */