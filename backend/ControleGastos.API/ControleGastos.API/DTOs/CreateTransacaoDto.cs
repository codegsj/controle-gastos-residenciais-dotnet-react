using ControleGastos.API.Models;

namespace ControleGastos.API.DTOs
{
    public class CreateTransacaoDto
    {
        public string Descricao { get; set; } = string.Empty; 
        public decimal Valor { get; set; } 
        public TipoTransacao Tipo { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public int PessoaId { get; set; }
    }
}
