using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
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
                throw new Exception("Pessoa não encontrada");
            }

            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita) // Verifica se a pessoa é menor de idade e está tentando cadastrar uma receita
            {
                throw new Exception("Pessoas menores de idade podem cadastrar apenas despesas.");
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
    }
}
