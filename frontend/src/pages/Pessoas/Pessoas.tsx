import { useEffect, useState } from "react";

import type { Pessoa } from "../../models/Pessoa";

import {
    listarPessoas,
    excluirPessoa
} from "../../services/pessoaService";

import PessoaTable from "./PessoaTable";

import PessoaForm from "./PessoaForm";

import "./Pessoas.css";




// página responsável pelo gerenciamento de pessoas

export default function Pessoas() {



    const [pessoas, setPessoas] = useState<Pessoa[]>([]);




    useEffect(() => {


        carregarPessoas();


    }, []);





    // busca pessoas na api

    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }






    // exclui uma pessoa

    async function removerPessoa(id: number) {


        await excluirPessoa(id);


        await carregarPessoas();


    }






    return (


        <div className="pessoas-container">


            <h1>
                Pessoas
            </h1>



            <p>
                Cadastro e gerenciamento de pessoas.
            </p>




            <PessoaForm

                onPessoaCriada={carregarPessoas}

            />





            <PessoaTable

                pessoas={pessoas}

                onExcluir={removerPessoa}

            />



        </div>


    );


}