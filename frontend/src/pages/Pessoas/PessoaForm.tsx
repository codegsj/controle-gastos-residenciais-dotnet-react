import { useState } from "react";

import type { CreatePessoa } from "../../models/CreatePessoa";

import { criarPessoa } from "../../services/pessoaService";



interface Props {


    // função enviada pela página de pessoas
    // responsável por atualizar a tabela depois do cadastro

    onPessoaCriada: () => void;


}



// componente responsável pelo cadastro de pessoas

export default function PessoaForm({

    onPessoaCriada

}: Props) {



    const [nome, setNome] = useState("");

    const [idade, setIdade] = useState("");





    // envia uma nova pessoa para a api

    async function salvarPessoa() {


        try {


            const novaPessoa: CreatePessoa = {


                nome: nome,


                idade: Number(idade)


            };



            await criarPessoa(novaPessoa);



            // limpa os campos após salvar

            setNome("");

            setIdade("");



            // atualiza a lista da tela

            onPessoaCriada();



        } catch (erro) {


            console.error(
                "erro ao cadastrar pessoa:",
                erro
            );


        }


    }




    return (

    <div className="form-pessoa">


            <h2>
                Nova Pessoa
            </h2>



            <input

                placeholder="Nome"

                value={nome}

                onChange={
                    e => setNome(e.target.value)
                }

            />



            <input

                placeholder="Idade"

                type="number"

                value={idade}

                onChange={
                    e => setIdade(e.target.value)
                }

            />



            <button

                onClick={salvarPessoa}

            >

                Salvar


            </button>



        </div>


    );


}