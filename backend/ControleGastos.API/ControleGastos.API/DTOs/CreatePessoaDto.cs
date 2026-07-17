using System.ComponentModel.DataAnnotations;

namespace ControleGastos.API.DTOs
{
    public class CreatePessoaDto
    {
        [Required(ErrorMessage = "O nome da pessoa é obrigatório.")] // validação para garantir que o nome da pessoa seja fornecido 
        [RegularExpression(
            @"^[a-zA-ZÀ-ÿ\s]+$",
            ErrorMessage = "O nome deve conter apenas letras."
        )]
        public string Nome { get; set; } = string.Empty; // representa o nome da pessoa

        [Range(0, 123, ErrorMessage = "A idade deve estar entre 0 e 123 anos.")] // validação para garantir que a idade da pessoa esteja dentro de um intervalo válido
        public int Idade { get; set; } // representa a idade da pessoa
    }
    
}

// DataAnnotations nos DTOs para validar regras básicas de entrada, como campos obrigatórios, limites de idade e formato do nome...