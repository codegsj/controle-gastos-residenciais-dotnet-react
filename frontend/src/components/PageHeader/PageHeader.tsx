import "./PageHeader.css";



interface Props {


    // título principal da página

    title: string;



    // descrição abaixo do título

    description: string;


}



// componente responsável pelo cabeçalho das páginas

export default function PageHeader({

    title,

    description


}: Props) {



    return (


        <div className="page-header">


            <h1>

                {title}

            </h1>



            <p>

                {description}

            </p>



        </div>


    );


}