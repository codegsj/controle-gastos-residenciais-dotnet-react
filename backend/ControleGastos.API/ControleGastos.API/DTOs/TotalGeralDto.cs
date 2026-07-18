namespace ControleGastos.API.DTOs
{
    public class TotalGeralDto // DTO (Data Transfer Object) que representa os totais gerais de receitas, despesas e saldo líquido de todas as pessoas cadastradas no sistema
    {
        public decimal TotalReceitas { get; set; }

        public decimal TotalDespesas { get; set; }

        public decimal SaldoLiquido { get; set; }
    }
}