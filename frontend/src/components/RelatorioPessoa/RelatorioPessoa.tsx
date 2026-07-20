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




    // lista usada no select

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);





    // pessoa selecionada

    const [pessoaSelecionada, setPessoaSelecionada] = useState<number>(0);





    // dados do relatório individual

    const [relatorio, setRelatorio] = useState<RelatorioPessoaModel | null>(null);







    useEffect(() => {


        carregarPessoas();


    }, []);







    // carrega todas as pessoas para o select

    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }








    // busca o relatório da pessoa selecionada

    async function consultarRelatorio(

        id: number

    ) {


        if(id === 0) {


            setRelatorio(null);


            return;


        }





        const dados = await buscarTotalPorPessoa(id);


        setRelatorio(dados);


    }







    return (



        <div className="relatorio-pessoa-container">





            <h2>

                Relatório por pessoa

            </h2>








            <select



                value={pessoaSelecionada}



                onChange={

                    e => {


                        const id = Number(e.target.value);



                        setPessoaSelecionada(id);



                        consultarRelatorio(id);



                    }

                }



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



                    <div className="card-relatorio">





                        <h3>

                            {relatorio.nomePessoa}

                        </h3>






                        <p>

                            Receitas:

                            <strong className="receita">

                                {

                                    relatorio.totalReceitas.toLocaleString(

                                        "pt-BR",

                                        {

                                            style: "currency",

                                            currency: "BRL"

                                        }

                                    )

                                }

                            </strong>

                        </p>







                        <p>

                            Despesas:

                            <strong className="despesa">

                                {

                                    relatorio.totalDespesas.toLocaleString(

                                        "pt-BR",

                                        {

                                            style: "currency",

                                            currency: "BRL"

                                        }

                                    )

                                }

                            </strong>

                        </p>








                        <p>

                            Saldo:

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

                                            style: "currency",

                                            currency: "BRL"

                                        }

                                    )

                                }

                            </strong>

                        </p>







                    </div>



                )


            }







        </div>



    );


}