namespace ControleGastos.API.DTOs
{
    public class PessoaResponseDto // DTO para representar a resposta de uma pessoa, incluindo informações básicas como Id, Nome e Idade
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public int Idade { get; set; }
    }
}