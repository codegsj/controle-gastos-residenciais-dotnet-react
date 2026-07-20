import type { Transacao } from "../../models/Transacao";



interface Props {


    transacoes: Transacao[];


}




// tabela responsável por exibir as transações

export default function TransacaoTable({

    transacoes

}: Props) {



    return (


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


                    <th>
                        Pessoa
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

                                R$ {transacao.valor}

                            </td>




                            <td>

                                {
                                    transacao.tipo === 1
                                        ? "Receita"
                                        : "Despesa"
                                }


                            </td>




                            <td>

                                {
                                    new Date(
                                        transacao.data
                                    ).toLocaleDateString()
                                }


                            </td>




                            <td>

                                {transacao.nomePessoa}

                            </td>



                        </tr>


                    ))

                }



            </tbody>


        </table>


    );

}