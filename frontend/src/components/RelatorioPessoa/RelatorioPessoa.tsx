import { useEffect, useState } from "react";


import {
    listarPessoas
} from "../../services/pessoaService";


import {
    buscarTotalPorPessoa
} from "../../services/relatorioService";


import type {
    Pessoa
} from "../../models/Pessoa";


import type {
    RelatorioPessoa as RelatorioPessoaModel
} from "../../models/Relatorio";


import "./RelatorioPessoa.css";





// componente responsável pelo relatório individual da pessoa

export default function RelatorioPessoa() {



    const [pessoas, setPessoas] = useState<Pessoa[]>([]);



    const [pessoaSelecionada, setPessoaSelecionada] = useState<number>(0);



    const [relatorio, setRelatorio] = useState<RelatorioPessoaModel | null>(null);






    useEffect(() => {


        carregarPessoas();


    }, []);








    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }








    async function consultarRelatorio(id:number) {


        if(id === 0) {


            setRelatorio(null);


            return;


        }



        const dados = await buscarTotalPorPessoa(id);


        setRelatorio(dados);


    }








    return (



        <div className="relatorio-pessoa">






            <select


                value={pessoaSelecionada}


                onChange={e => {


                    const id = Number(e.target.value);


                    setPessoaSelecionada(id);


                    consultarRelatorio(id);


                }}


            >



                <option value={0}>

                    Selecione uma pessoa

                </option>





                {

                    pessoas.map(pessoa => (


                        <option

                            key={pessoa.id}

                            value={pessoa.id}

                        >

                            {pessoa.nome}

                        </option>


                    ))

                }



            </select>









            {

                relatorio && (



                    <div className="dados-relatorio">





                        <h3>

                            {relatorio.nomePessoa}

                        </h3>





                        <div className="linha-relatorio">


                            <span>

                                Receitas

                            </span>


                            <strong className="receita">

                                {

                                    relatorio.totalReceitas.toLocaleString(

                                        "pt-BR",

                                        {

                                            style:"currency",

                                            currency:"BRL"

                                        }

                                    )

                                }

                            </strong>



                        </div>









                        <div className="linha-relatorio">


                            <span>

                                Despesas

                            </span>


                            <strong className="despesa">

                                {

                                    relatorio.totalDespesas.toLocaleString(

                                        "pt-BR",

                                        {

                                            style:"currency",

                                            currency:"BRL"

                                        }

                                    )

                                }

                            </strong>



                        </div>









                        <div className="linha-relatorio">


                            <span>

                                Saldo

                            </span>


                            <strong

                                className={

                                    relatorio.saldo >= 0

                                    ?

                                    "saldo-positivo"

                                    :

                                    "saldo-negativo"

                                }

                            >

                                {

                                    relatorio.saldo.toLocaleString(

                                        "pt-BR",

                                        {

                                            style:"currency",

                                            currency:"BRL"

                                        }

                                    )

                                }

                            </strong>



                        </div>






                    </div>



                )

            }







        </div>



    );

}