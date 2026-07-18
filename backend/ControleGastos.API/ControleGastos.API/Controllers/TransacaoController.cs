using ControleGastos.API.DTOs;
using ControleGastos.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase // responsável por receber requisições relacionadas às transações e delegar as operações para o serviço.
                                                      // try catch foi removido do controller e adicionado no middleware de tratamento de exceções, para centralizar o tratamento de erros e evitar duplicação de código.
    {
        private readonly TransacaoService _service;

        public TransacaoController(TransacaoService service)
        {
            _service = service;
        }


        [HttpPost]
        public async Task<IActionResult> CriarTransacao( // endpoint para criar uma nova transação
            [FromBody] CreateTransacaoDto dto)
        {
            var transacao = await _service.CriarTransacaoAsync(dto); // chama o serviço para criar a transação com base nos dados recebidos no corpo da requisição

            return CreatedAtAction(
                nameof(CriarTransacao),
                new { id = transacao.Id },
                transacao
            );
        }


        [HttpGet]
        public async Task<IActionResult> ListarTransacoes() // endpoint para listar todas as transações
        {
            var transacoes = await _service.ListarTransacoesAsync(); // chama o serviço para listar todas as trans

            return Ok(transacoes);
        }


        [HttpGet("/api/pessoas/{pessoaId}/transacoes")]
        public async Task<IActionResult> ObterTransacoesPorPessoa(int pessoaId) // endpoint para obter as transações de uma pessoa específica
        {
            var transacoes = await _service.ObterTransacoesPorPessoaAsync(pessoaId); // chama o serviço para obter as transações da pessoa com base no id recebido na rota

            return Ok(transacoes);
        }
    }
}