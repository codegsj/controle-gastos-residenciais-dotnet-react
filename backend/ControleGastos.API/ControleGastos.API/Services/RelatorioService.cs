using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
using ControleGastos.API.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Services
{
    public class RelatorioService // serviço responsável por gerar relatórios de gastos, receitas e saldo líquido das pessoas cadastradas no sistema
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RelatorioService> _logger;


        public RelatorioService(
            ApplicationDbContext context,
            ILogger<RelatorioService> logger)
        {
            _context = context;
            _logger = logger;
        }


        public async Task<RelatorioGastosDto> ObterTotaisAsync() // método assíncrono que retorna um objeto do tipo RelatorioGastosDto contendo os totais de receitas, despesas e saldo líquido de todas as pessoas cadastradas no sistema
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();


            _logger.LogInformation(
                "Geração de relatório geral iniciada. Quantidade de pessoas encontradas: {Quantidade}",
                pessoas.Count
            );


            var resultado = pessoas.Select(p => new ConsultaTotaisDto
            {
                PessoaId = p.Id,
                NomePessoa = p.Nome,

                TotalReceitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor),

                TotalDespesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor),

                Saldo =
                    p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor)
                    -
                    p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor)

            }).ToList();


            var totalGeral = new TotalGeralDto // objeto que representa os totais gerais de receitas, despesas e saldo líquido de todas as pessoas cadastradas no sistema
            {
                TotalReceitas = resultado.Sum(x => x.TotalReceitas),

                TotalDespesas = resultado.Sum(x => x.TotalDespesas),

                SaldoLiquido =
                    resultado.Sum(x => x.TotalReceitas)
                    -
                    resultado.Sum(x => x.TotalDespesas)
            };


            _logger.LogInformation(
                "Relatório geral gerado com sucesso."
            );


            return new RelatorioGastosDto // objeto que representa o relatório de gastos, receitas e saldo líquido de todas as pessoas cadastradas no sistema
            {
                Pessoas = resultado,
                TotalGeral = totalGeral
            };
        }


        public async Task<ConsultaTotaisDto> ObterTotaisPorPessoaAsync(int pessoaId) // método assíncrono que retorna um objeto do tipo ConsultaTotaisDto contendo os totais de receitas, despesas e saldo líquido de uma pessoa específica cadastrada no sistema
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.Transacoes)
                .FirstOrDefaultAsync(p => p.Id == pessoaId);


            if (pessoa == null) // verifica se a pessoa existe no banco de dados, caso não exista retorna uma exceção de pessoa não encontrada
            {
                _logger.LogWarning(
                    "Tentativa de gerar relatório para pessoa inexistente. PessoaId: {PessoaId}",
                    pessoaId
                );

                throw new NotFoundException("Pessoa não encontrada.");
            }


            var receitas = pessoa.Transacoes // calcula o total de receitas da pessoa, somando os valores das transferências do tipo Receita
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);


            var despesas = pessoa.Transacoes // calcula o total de despesas da pessoa, somando os valores das transferências do tipo Despesa
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);


            _logger.LogInformation(
                "Relatório individual gerado com sucesso. PessoaId: {PessoaId}",
                pessoaId
            );


            return new ConsultaTotaisDto // retorna um objeto do tipo ConsultaTotaisDto contendo os totais de receitas, despesas e saldo líquido da pessoa específica
            {
                PessoaId = pessoa.Id,
                NomePessoa = pessoa.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            };
        }
    }
}