// representa os tipos possíveis de transação

export type TipoTransacao = 1 | 2;


// representa uma transação financeira
// possui os mesmos campos retornados pela api

export interface Transacao {

    // id da transação no banco de dados
    id: number;

    // descrição informada no cadastro
    descricao: string;

    // valor financeiro da movimentação
    valor: number;

    // tipo da transação
    // 1 = receita
    // 2 = despesa
    tipo: TipoTransacao;

    // data da transação
    data: string;

    // id da pessoa relacionada
    pessoaId: number;

    // nome da pessoa relacionada
    nomePessoa?: string;

}