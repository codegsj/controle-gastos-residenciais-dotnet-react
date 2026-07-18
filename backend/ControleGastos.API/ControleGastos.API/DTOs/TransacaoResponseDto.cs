using ControleGastos.API.Models;

namespace ControleGastos.API.DTOs
{
    public class TransacaoResponseDto // DTO para representar a resposta de uma transação, incluindo informações sobre a pessoa associada à transação
    {
        public int Id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public TipoTransacao Tipo { get; set; }

        public DateTime Data { get; set; }

        public int PessoaId { get; set; }

        public string NomePessoa { get; set; } = string.Empty;
    }
}