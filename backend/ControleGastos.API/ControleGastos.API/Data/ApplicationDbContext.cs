using Microsoft.EntityFrameworkCore;
using ControleGastos.API.Models;
namespace ControleGastos.API.Data
{
    public class ApplicationDbContext : DbContext // representa o contexto do banco de dados da aplicação
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) // construtor que recebe as opções de configuração do contexto do banco de dados
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; } // representa a tabela de pessoas no banco de dados

        public DbSet<Transacao> Transacoes { get; set; } // representa a tabela de transações no banco de dados

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pessoa>()
                .HasMany(p => p.Transacoes) // uma pessoa pode ter muitas transações
                .WithOne(t => t.Pessoa) // uma transação pertence a uma pessoa
                .HasForeignKey(t => t.PessoaId) // a chave estrangeira da transação é o Id da pessoa
                .OnDelete(DeleteBehavior.Cascade); // quando uma pessoa for deletada, suas transações também serão deletadas
        }
    }
}
