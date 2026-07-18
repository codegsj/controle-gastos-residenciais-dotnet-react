using ControleGastos.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase // responsável por receber requisições relacionadas aos relatórios e delegar as operações para o serviço.
    {
        private readonly RelatorioService _service;

        public RelatorioController(RelatorioService service)
        {
            _service = service;
        }


        [HttpGet("totais")] // endpoint para obter os totais de receitas, despesas e saldo líquido de todas as pessoas cadastradas no sistema
        public async Task<IActionResult> ObterTotais()
        {
            try
            {
                var resultado = await _service.ObterTotaisAsync();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensagem = ex.Message
                });
            }
        }

        [HttpGet("totais/{pessoaId}")] // endpoint para obter os totais de receitas, despesas e saldo de uma pessoa específica
        public async Task<IActionResult> ObterTotaisPorPessoa(int pessoaId)
        {
            var resultado = await _service.ObterTotaisPorPessoaAsync(pessoaId);


            if (resultado == null)
            {
                return NotFound(new
                {
                    mensagem = "Pessoa não encontrada."
                });
            }


            return Ok(resultado);
        }
    }
}