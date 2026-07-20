import { useEffect, useState } from "react";

import type { Pessoa } from "../../models/Pessoa";

import {
    listarPessoas,
    excluirPessoa
} from "../../services/pessoaService";

import PessoaTable from "./PessoaTable";

import PessoaForm from "./PessoaForm";

import PageHeader from "../../components/PageHeader/PageHeader";

import "./Pessoas.css";



// página responsável pelo gerenciamento de pessoas

export default function Pessoas() {



    const [pessoas, setPessoas] = useState<Pessoa[]>([]);



    useEffect(() => {


        carregarPessoas();


    }, []);




    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }




    async function removerPessoa(id:number) {


        await excluirPessoa(id);


        await carregarPessoas();


    }





    return (


        <div className="pessoas-container">


            <PageHeader

                title="Pessoas"

                description="Gerencie os usuários cadastrados no sistema."


            />



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