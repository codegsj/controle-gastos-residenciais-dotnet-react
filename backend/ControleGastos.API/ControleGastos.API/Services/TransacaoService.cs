using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
using ControleGastos.API.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Services

{
    public class TransacaoService // classe responsável por salvar, buscar e excluir transações no banco de dados
    {
        private readonly ApplicationDbContext _context;

        public TransacaoService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<Transacao> CriarTransacaoAsync(CreateTransacaoDto dto) // metodo para criar uma transação e verificar se a pessoa é maior de idade para cadastrar receita
        {
            var pessoa = await _context.Pessoas
                .FirstOrDefaultAsync(p => p.Id == dto.PessoaId);


            if (pessoa == null)
            {
                throw new NotFoundException("Pessoa não encontrada.");
            }


            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita) // Verifica se a pessoa é menor de idade e está tentando cadastrar uma receita
            {
                throw new BusinessException("Pessoas menores de idade podem cadastrar apenas despesas.");
            }


            var transacao = new Transacao // Cria uma nova transação com os dados do DTO
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                Data = dto.Data,
                PessoaId = dto.PessoaId
            };


            _context.Transacoes.Add(transacao); // Adiciona a transação ao contexto e salva as alterações no banco de dados

            await _context.SaveChangesAsync();

            return transacao;
        }


        public async Task<List<TransacaoResponseDto>> ListarTransacoesAsync() // metodo para listar todas as transações, incluindo o nome da pessoa associada a cada transação
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Pessoa)
                .ToListAsync();


            return transacoes.Select(t => new TransacaoResponseDto // Mapeia cada transação para um DTO de resposta, incluindo o nome da pessoa associada
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,
                Data = t.Data,
                PessoaId = t.PessoaId,
                NomePessoa = t.Pessoa.Nome

            }).ToList();
        }


        public async Task<List<TransacaoResponseDto>> ObterTransacoesPorPessoaAsync(int pessoaId) // metodo para obter todas as transações de uma pessoa específica, incluindo o nome da pessoa associada a cada transação
        {
            var pessoaExiste = await _context.Pessoas
                .AnyAsync(p => p.Id == pessoaId);


            if (!pessoaExiste)
            {
                throw new NotFoundException("Pessoa não encontrada."); // Lança uma exceção se a pessoa não for encontrada no banco de dados
            }


            var transacoes = await _context.Transacoes
                .Include(t => t.Pessoa)
                .Where(t => t.PessoaId == pessoaId)
                .ToListAsync();


            return transacoes.Select(t => new TransacaoResponseDto // Mapeia cada transação para um DTO de resposta, incluindo o nome da pessoa associada
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,
                Data = t.Data,
                PessoaId = t.PessoaId,
                NomePessoa = t.Pessoa.Nome

            }).ToList();
        }

    }
}