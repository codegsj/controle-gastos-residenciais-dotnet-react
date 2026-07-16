using ControleGastos.API.Services;
using ControleGastos.API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers
{
    [ApiController]
    [Route("api/pessoas")]
    public class PessoaController : ControllerBase // // responsável por receber requisições relacionadas às pessoas e delegar as operações para o serviço.
    {
      private readonly PessoaService _service;

      public PessoaController(PessoaService service) // construtor que recebe o serviço de pessoa
        {
            _service = service;
        }

        [HttpPost] // endpoint para criar uma nova pessoa
        public async Task<IActionResult> CriarPessoa([FromBody] CreatePessoaDto dto) // método que recebe os dados da pessoa e chama o serviço para criar a pessoa no banco de dados
        {
            if (!ModelState.IsValid) // validação dos dados recebidos
            {
                return BadRequest(ModelState); // retorna um erro caso os dados sejam inválidos
            }
            var pessoa = await _service.CriarPessoaAsync(dto); // chama o serviço para criar a pessoa no banco de dados
            return CreatedAtAction(nameof(CriarPessoa), new { id = pessoa.Id }, pessoa); // retorna a pessoa criada com o status 201
        }

        [HttpGet] // endpoint para listar todas as pessoas
        public async Task<IActionResult> ListarPessoas() // método que chama o serviço para listar todas as pessoas no banco de dados
        {
            var pessoas = await _service.ListarPessoasAsync(); // chama o serviço para listar todas as pessoas no banco de dados
            return Ok(pessoas); // retorna a lista de pessoas com o status 200
        }

        [HttpDelete("{id}")] // endpoint para excluir uma pessoa
        public async Task<IActionResult> ExcluirPessoa(int id) // método que recebe o id da pessoa e chama o serviço para excluir a pessoa do banco de dados
        {
            var removido = await _service.ExcluirPessoaAsync(id); // chama o serviço para excluir a pessoa do banco de dados
            if (!removido) // verifica se a pessoa foi excluída com sucesso
            {
                return NotFound(new {mensagem = "Pessoa não encontrada."}); // retorna um erro caso a pessoa não exista
            }
            return NoContent(); // retorna o status 204 caso a pessoa tenha sido excluída com sucesso
        }
    }
}
