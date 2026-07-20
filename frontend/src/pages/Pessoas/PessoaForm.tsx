import { useState } from "react";


import type {
    CreatePessoa
} from "../../models/CreatePessoa";


import {
    criarPessoa
} from "../../services/pessoaService";



import "./PessoaForm.css";





interface Props {


    // função executada após criar uma pessoa

    onPessoaCriada: () => void;


}







// componente responsável pelo cadastro de pessoas

export default function PessoaForm({

    onPessoaCriada

}: Props) {





    const [nome, setNome] = useState("");


    const [idade, setIdade] = useState("");









    async function salvarPessoa() {


        try {



            const novaPessoa: CreatePessoa = {


                nome,


                idade: Number(idade)


            };





            await criarPessoa(novaPessoa);






            setNome("");


            setIdade("");





            onPessoaCriada();






        } catch (erro) {


            console.error(

                "Erro ao cadastrar pessoa:",

                erro

            );


        }


    }









    return (



        <div className="form-pessoa">






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