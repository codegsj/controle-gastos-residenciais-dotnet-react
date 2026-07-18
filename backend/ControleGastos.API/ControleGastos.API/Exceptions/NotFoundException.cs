namespace ControleGastos.API.Exceptions
{
    public class NotFoundException : Exception // Exceção personalizada para indicar que um recurso não foi encontrado
    {
        public NotFoundException(string message)
            : base(message)
        {
        }
    }
}