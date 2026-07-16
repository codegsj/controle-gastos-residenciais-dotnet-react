using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Services
{
    public class PessoaService // classe responsável por salvar, buscar e excluir pessoas no banco de dados
    {
        private readonly ApplicationDbContext _context;
        public PessoaService(ApplicationDbContext context) // construtor que recebe o contexto do banco de dados
        {
            _context = context;
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
            return pessoa;
        }

        public async Task<List<Pessoa>> ListarPessoasAsync() // método que lista todas as pessoas no banco de dados
        {
            return await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();
        }

        public async Task<bool> ExcluirPessoaAsync(int id) // método que exclui uma pessoa do banco de dados
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null)
            {
                return false; // retorna falso caso a pessoa não exista
            }
            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            return true; // retorna verdadeiro caso a pessoa tenha sido excluída com sucesso
        }
    }
}
