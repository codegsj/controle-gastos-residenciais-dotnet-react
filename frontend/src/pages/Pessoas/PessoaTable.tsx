import type { Pessoa } from "../../models/Pessoa";



interface Props {


    pessoas: Pessoa[];


    // função responsável por excluir uma pessoa

    onExcluir: (id: number) => void;


}



// componente responsável pela tabela de pessoas

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


                            <td>


                                <button

                                    onClick={() =>
                                        onExcluir(pessoa.id)
                                    }

                                >

                                    🗑


                                </button>


                            </td>


                        </tr>


                    ))

                }


            </tbody>


        </table>


    );


}