import api from "./api";

import type { Pessoa } from "../models/Pessoa";


// busca todas as pessoas cadastradas na api

export async function listarPessoas() {


    const resposta = await api.get<Pessoa[]>("/pessoas");


    return resposta.data;


}