namespace ControleGastos.API.DTOs
{
    public class RelatorioGastosDto
    {
        public List<ConsultaTotaisDto> Pessoas { get; set; } = new();

        public TotalGeralDto TotalGeral { get; set; } = new();
    }
}