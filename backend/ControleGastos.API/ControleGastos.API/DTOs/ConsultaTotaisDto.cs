namespace ControleGastos.API.DTOs
{
    public class ConsultaTotaisDto // DTO (Data Transfer Object) que representa os totais de receitas, despesas e saldo de uma pessoa específica
    {
        public int PessoaId { get; set; }

        public string NomePessoa { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }

        public decimal TotalDespesas { get; set; }

        public decimal Saldo { get; set; }
    }
}