import "./PageHeader.css";



interface Props {


    titulo: string;


    descricao: string;


}





// componente padrão utilizado
// no topo das páginas

export default function PageHeader({


    titulo,


    descricao


}: Props) {



    return (



        <header className="page-header">



            <h1>

                {titulo}

            </h1>





            <p>

                {descricao}

            </p>





        </header>



    );


}