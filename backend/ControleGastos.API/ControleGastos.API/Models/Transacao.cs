namespace ControleGastos.API.Models
{
    public class Transacao
    {
        public int Id { get; set; } // representa o identificador único da transação / pk no banco de dados
        public string Descricao { get; set; } = string.Empty; // representa a descrição da transação
       public decimal Valor { get; set; } // representa o valor da transação
       public TipoTransacao Tipo { get; set; } // representa o tipo da transação (receita ou despesa)
        public DateTime Data { get; set; } = DateTime.Now; // representa a data da transação
        public int PessoaId { get; set; } // representa o identificador da pessoa 
        public Pessoa Pessoa { get; set; } = null!;
    }
}
