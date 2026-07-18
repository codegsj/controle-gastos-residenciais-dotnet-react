using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;
using Serilog.Core;

namespace ControleGastos.API.Services
{
    public class PessoaService // classe responsável por salvar, buscar e excluir pessoas no banco de dados
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PessoaService> _logger;
        public PessoaService( // construtor da classe PessoaService que recebe o contexto do banco de dados e o logger como parâmetros
            ApplicationDbContext context,
            ILogger<PessoaService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Pessoa> CriarPessoaAsync(CreatePessoaDto dto) // método que cria uma nova pessoa no banco de dados
        {
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            _logger.LogInformation( // registra uma mensagem de log informando que a pessoa foi criada com sucesso
                "Pessoa criada com sucesso. Id: {Id}, Nome: {Nome}, Idade: {Idade}",
                 pessoa.Id,
                 pessoa.Nome,
                 pessoa.Idade
);
            return pessoa;
        }


        public async Task<List<PessoaResponseDto>> ListarPessoasAsync() // método que lista todas as pessoas do banco de dados 
        {
            var pessoas = await _context.Pessoas
                .ToListAsync();


            _logger.LogInformation(
                "Consulta de pessoas realizada com sucesso. Quantidade encontrada: {Quantidade}",
                pessoas.Count
            );


            return pessoas.Select(p => new PessoaResponseDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade
            }).ToList();
        }


        public async Task<bool> ExcluirPessoaAsync(int id) // método que exclui uma pessoa do banco de dados
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
            {
                _logger.LogWarning(
                    "Tentativa de excluir pessoa inexistente. Id informado: {Id}",
                    id
                );

                return false; // retorna falso caso a pessoa não exista
            }

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();


            _logger.LogInformation(
                "Pessoa excluída com sucesso. Id: {Id}",
                id
            );


            return true; // retorna verdadeiro caso a pessoa tenha sido excluída com sucesso
        }
    }
}