import type {
    RelatorioPessoa
} from "../../models/Relatorio";


import "./ResumoFinanceiro.css";





interface Props {


    relatorios: RelatorioPessoa[];


}








// componente responsável pelo resumo financeiro geral

export default function ResumoFinanceiro({


    relatorios


}: Props) {




    const totalReceitas = relatorios.reduce(


        (total, pessoa) =>

            total + pessoa.totalReceitas,


        0


    );







    const totalDespesas = relatorios.reduce(


        (total, pessoa) =>

            total + pessoa.totalDespesas,


        0


    );







    const saldoTotal =

        totalReceitas - totalDespesas;









    function formatarValor(valor:number) {


        return valor.toLocaleString(


            "pt-BR",


            {


                style:"currency",


                currency:"BRL"


            }


        );


    }








    return (



        <div className="resumo-financeiro">







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



                            <tr key={pessoa.pessoaId}>


                                <td>

                                    {pessoa.nomePessoa}

                                </td>




                                <td className="receita">

                                    {formatarValor(
                                        pessoa.totalReceitas
                                    )}

                                </td>




                                <td className="despesa">

                                    {formatarValor(
                                        pessoa.totalDespesas
                                    )}

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

                                    {formatarValor(
                                        pessoa.saldo
                                    )}

                                </td>




                            </tr>



                        ))


                    }


                </tbody>




            </table>









            <div className="total-geral">



                <h3>

                    Total geral

                </h3>







                <div className="linha-total">


                    <span>

                        Receitas

                    </span>



                    <strong className="receita">

                        {formatarValor(totalReceitas)}

                    </strong>


                </div>








                <div className="linha-total">


                    <span>

                        Despesas

                    </span>



                    <strong className="despesa">

                        {formatarValor(totalDespesas)}

                    </strong>


                </div>








                <div className="linha-total">


                    <span>

                        Saldo líquido

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

                        {formatarValor(saldoTotal)}

                    </strong>


                </div>







            </div>







        </div>


    );


}