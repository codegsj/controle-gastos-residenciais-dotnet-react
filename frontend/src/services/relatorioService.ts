import api from "./api";


import type {
    RelatorioTotais
} from "../models/Relatorio";




// busca os totais financeiros de todas as pessoas

export async function buscarTotais() {


    const resposta = await api.get<RelatorioTotais>(

        "/Relatorio/totais"

    );


    return resposta.data;


}