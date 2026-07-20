import api from "./api";


import type { Transacao } from "../models/Transacao";


import type { CreateTransacao } from "../models/CreateTransacao";




// busca todas as transações cadastradas

export async function listarTransacoes() {


    const resposta = await api.get<Transacao[]>(
        "/transacoes"
    );


    return resposta.data;


}




// cria uma nova transação

export async function criarTransacao(

    transacao: CreateTransacao

) {


    const resposta = await api.post<Transacao>(

        "/transacoes",

        transacao

    );

    

    return resposta.data;


}

// busca transações de uma pessoa específica

export async function listarTransacoesPorPessoa(

    pessoaId: number

) {


    const resposta = await api.get<Transacao[]>(

        `/pessoas/${pessoaId}/transacoes`

    );


    return resposta.data;


}