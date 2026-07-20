import api from "./api";

import type { Pessoa } from "../models/Pessoa";

import type { CreatePessoa } from "../models/CreatePessoa";



// busca todas as pessoas cadastradas

export async function listarPessoas() {


    const resposta = await api.get<Pessoa[]>("/pessoas");


    return resposta.data;


}




// cadastra uma nova pessoa

export async function criarPessoa(
    pessoa: CreatePessoa
) {


    const resposta = await api.post<Pessoa>(
        "/pessoas",
        pessoa
    );


    return resposta.data;


}




// exclui uma pessoa pelo id

export async function excluirPessoa(
    id: number
) {


    await api.delete(
        `/pessoas/${id}`
    );


}