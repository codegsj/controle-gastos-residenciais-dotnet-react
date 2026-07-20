import api from "./api";


import type {
    RelatorioTotais,
    RelatorioPessoa
} from "../models/Relatorio";






// busca o relatório geral de todas as pessoas

export async function buscarTotais() {


    const resposta = await api.get<RelatorioTotais>(

        "/Relatorio/totais"

    );


    return resposta.data;


}








// busca o relatório individual de uma pessoa

export async function buscarTotalPorPessoa(

    pessoaId: number

) {


    const resposta = await api.get<RelatorioPessoa>(

        `/Relatorio/totais/${pessoaId}`

    );


    return resposta.data;


}