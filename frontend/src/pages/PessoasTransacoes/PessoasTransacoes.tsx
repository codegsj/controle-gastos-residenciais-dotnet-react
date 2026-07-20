import { useEffect, useState } from "react";


import { useParams } from "react-router-dom";


import type { Transacao } from "../../models/Transacao";


import {
    listarTransacoesPorPessoa
} from "../../services/transacaoService";


import PageHeader from "../../components/PageHeader/PageHeader";


import "./PessoasTransacoes.css";






// página que mostra todas as transações de uma pessoa

export default function PessoasTransacoes() {



    const { id } = useParams();



    const [transacoes, setTransacoes] = useState<Transacao[]>([]);






    useEffect(() => {


        carregarTransacoes();


    }, []);







    async function carregarTransacoes() {



        if (!id) return;



        const dados = await listarTransacoesPorPessoa(

            Number(id)

        );



        setTransacoes(dados);



    }







    return (



        <div className="pessoas-transacoes-container">




            <PageHeader

                title="Transações da Pessoa"

                description="Lista de receitas e despesas cadastradas."

            />







            <table className="tabela-transacoes">



                <thead>


                    <tr>


                        <th>
                            Descrição
                        </th>


                        <th>
                            Valor
                        </th>


                        <th>
                            Tipo
                        </th>


                        <th>
                            Data
                        </th>


                    </tr>


                </thead>





                <tbody>



                    {


                        transacoes.map(transacao => (


                            <tr key={transacao.id}>


                                <td>

                                    {transacao.descricao}

                                </td>



                                <td>

                                    {
                                        transacao.valor.toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL"
                                            }
                                        )
                                    }

                                </td>



                                <td>


    <span

        className={
            transacao.tipo === 1
                ? "tipo-receita"
                : "tipo-despesa"
        }

    >


        {

            transacao.tipo === 1

                ? "Receita"

                : "Despesa"

        }


    </span>


</td>



                                <td>

                                    {
                                        new Date(
                                            transacao.data
                                        ).toLocaleDateString(
                                            "pt-BR"
                                        )
                                    }

                                </td>



                            </tr>


                        ))


                    }



                </tbody>


            </table>





        </div>


    );


}