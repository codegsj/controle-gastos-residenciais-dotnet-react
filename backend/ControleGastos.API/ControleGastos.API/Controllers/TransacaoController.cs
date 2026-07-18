using ControleGastos.API.DTOs;
using ControleGastos.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers // 
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase // responsável por receber requisições relacionadas às transações e delegar as operações para o serviço.
    {
        private readonly TransacaoService _service;

        public TransacaoController(TransacaoService service) // construtor que recebe o serviço de transação
        {
            _service = service;
        }


        [HttpPost] // endpoint para criar uma nova transação
        public async Task<IActionResult> CriarTransacao( // método que recebe os dados da transação e chama o serviço para criar a transação no banco de dados
            [FromBody] CreateTransacaoDto dto)
        {
            try
            {
                var transacao = await _service.CriarTransacaoAsync(dto); // chama o serviço para criar a transação no banco de dados

                return CreatedAtAction( // retorna um status code 201 (Created) com a localização da nova transação criada
                    nameof(CriarTransacao),
                    new { id = transacao.Id },
                    transacao
                );
            }
            catch (Exception ex)
            {
                return BadRequest(new // retorna um status code 400 (Bad Request) com a mensagem de erro caso ocorra alguma exceção
                {
                    mensagem = ex.Message
                });
            }
        }

        [HttpGet] // endpoint para listar todas as transações
        public async Task<IActionResult> ListarTransacoes() // método que chama o serviço para listar todas as transações do banco de dados
        {
            var transacoes = await _service.ListarTransacoesAsync(); 
            return Ok(transacoes); // retorna um status code 200 (OK) com a lista de transações ou vazia [] se não houver transações cadastradas (colocar mensagem de nenhuma transacao encontrada e registrar em logs )
        }
    }
}