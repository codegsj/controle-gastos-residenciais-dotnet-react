import type {
    RelatorioPessoa
} from "../../models/Relatorio";


import "./ResumoFinanceiro.css";





interface Props {


    // lista contendo os dados financeiros das pessoas

    relatorios: RelatorioPessoa[];


}







// componente responsável por exibir
// o resumo financeiro geral das pessoas

export default function ResumoFinanceiro({


    relatorios


}: Props) {






    // soma todas as receitas

    const totalReceitas = relatorios.reduce(


        (total, pessoa) =>


            total + pessoa.totalReceitas,


        0


    );








    // soma todas as despesas

    const totalDespesas = relatorios.reduce(


        (total, pessoa) =>


            total + pessoa.totalDespesas,


        0


    );








    // calcula o saldo geral

    const saldoTotal =


        totalReceitas - totalDespesas;









    return (



        <div className="resumo-container">








            <h2>

                Resumo financeiro por pessoa

            </h2>








            <table className="tabela-resumo">





                <thead>


                    <tr>



                        <th>

                            Pessoa

                        </th>





                        <th>

                            Receitas

                        </th>





                        <th>

                            Despesas

                        </th>





                        <th>

                            Saldo

                        </th>





                    </tr>


                </thead>








                <tbody>





                    {


                        relatorios.map(pessoa => (




                            <tr

                                key={pessoa.pessoaId}

                            >





                                <td>

                                    {pessoa.nomePessoa}

                                </td>







                                <td className="receita">


                                    {

                                        pessoa.totalReceitas.toLocaleString(

                                            "pt-BR",

                                            {

                                                style: "currency",

                                                currency: "BRL"

                                            }

                                        )

                                    }


                                </td>








                                <td className="despesa">


                                    {

                                        pessoa.totalDespesas.toLocaleString(

                                            "pt-BR",

                                            {

                                                style: "currency",

                                                currency: "BRL"

                                            }

                                        )

                                    }


                                </td>








                                <td

                                    className={

                                        pessoa.saldo >= 0

                                        ?

                                        "saldo-positivo"

                                        :

                                        "saldo-negativo"

                                    }

                                >


                                    {

                                        pessoa.saldo.toLocaleString(

                                            "pt-BR",

                                            {

                                                style: "currency",

                                                currency: "BRL"

                                            }

                                        )

                                    }


                                </td>






                            </tr>



                        ))



                    }







                </tbody>






            </table>









            {/*

                fechamento do relatório

                conforme solicitado no teste

            */}





            <div className="total-geral">






                <h2>

                    Total geral

                </h2>








                <div>


                    <span>

                        Total de receitas:

                    </span>


                    <strong className="receita">


                        {

                            totalReceitas.toLocaleString(

                                "pt-BR",

                                {

                                    style: "currency",

                                    currency: "BRL"

                                }

                            )

                        }


                    </strong>



                </div>









                <div>


                    <span>

                        Total de despesas:

                    </span>


                    <strong className="despesa">


                        {

                            totalDespesas.toLocaleString(

                                "pt-BR",

                                {

                                    style: "currency",

                                    currency: "BRL"

                                }

                            )

                        }


                    </strong>



                </div>









                <div>


                    <span>

                        Saldo líquido:

                    </span>


                    <strong

                        className={

                            saldoTotal >= 0

                            ?

                            "saldo-positivo"

                            :

                            "saldo-negativo"

                        }

                    >


                        {

                            saldoTotal.toLocaleString(

                                "pt-BR",

                                {

                                    style: "currency",

                                    currency: "BRL"

                                }

                            )

                        }


                    </strong>



                </div>







            </div>







        </div>



    );


}