// representa uma transação retornada pela api

export interface Transacao {


    // identificador da transação

    id: number;



    // descrição da movimentação

    descricao: string;



    // valor da transação

    valor: number;



    // tipo recebido da api
    // 1 = receita
    // 2 = despesa

    tipo: number;



    // data da movimentação

    data: string;



    // pessoa relacionada

    pessoaId: number;



    // nome da pessoa relacionada

    nomePessoa: string;


}