namespace ControleGastos.API.Exceptions
{
    public class BusinessException : Exception // Exceção personalizada para indicar que ocorreu um erro de negócio, como uma regra de validação violada
    {
        public BusinessException(string message)
            : base(message)
        {
        }
    }
}