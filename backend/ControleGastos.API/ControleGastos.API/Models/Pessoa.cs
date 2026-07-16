namespace ControleGastos.API.Models
{
    // classe que representa uma pessoa no sistema de controle de gastos.
    public class Pessoa
    {
        public int Id { get; set; } //  representa o identificador único da pessoa / pk no banco de dados
        public string Nome { get; set; }
        public int Idade { get; set; } // menor de idade só pode cadastrar despesas 
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>(); // representa as transações das pessoas 
    }
}
