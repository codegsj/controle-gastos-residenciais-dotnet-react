import { Link } from "react-router-dom";


import type { Pessoa } from "../../models/Pessoa";




interface Props {


    pessoas: Pessoa[];


    // função recebida da página para excluir uma pessoa

    onExcluir: (id: number) => void;


}






// tabela responsável por exibir as pessoas cadastradas

export default function PessoaTable({

    pessoas,

    onExcluir


}: Props) {



    return (



        <table className="tabela-pessoas">



            <thead>



                <tr>



                    <th>

                        Nome

                    </th>



                    <th>

                        Idade

                    </th>



                    <th>

                        Ações

                    </th>



                </tr>



            </thead>







            <tbody>



                {



                    pessoas.map(pessoa => (



                        <tr key={pessoa.id}>



                            <td>


                                {pessoa.nome}


                            </td>







                            <td>


                                {pessoa.idade}


                            </td>







                            <td className="acoes-pessoa">





                                {/*

                                    botão para visualizar

                                    as transações da pessoa

                                */}



                                <Link

                                    className="botao-transacoes"

                                    to={`/pessoas/${pessoa.id}/transacoes`}

                                >

                                    Ver transações


                                </Link>








                                {/*

                                    botão para excluir pessoa

                                */}



                                <button


                                    className="botao-excluir"



                                    onClick={() => {



                                        const confirmar =

                                            window.confirm(

                                                `Deseja excluir ${pessoa.nome}?`

                                            );




                                        if (confirmar) {


                                            onExcluir(pessoa.id);


                                        }



                                    }}



                                >


                                    Excluir



                                </button>






                            </td>






                        </tr>






                    ))



                }





            </tbody>





        </table>



    );


}