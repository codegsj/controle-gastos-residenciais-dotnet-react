import type { Pessoa } from "../../models/Pessoa";


interface Props {

    pessoas: Pessoa[];

}


// componente responsável por mostrar
// a lista de pessoas em formato de tabela

export default function PessoaTable({ pessoas }: Props) {


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

                                <button>

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