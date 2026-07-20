import "./Card.css";


// propriedades que o componente Card recebe
interface CardProps {

    titulo: string;

    valor: string;

}


export default function Card({ titulo, valor }: CardProps) {


    // componente responsável por exibir
    // informações resumidas do sistema


    return (

        <div className="card">


            {/* título do indicador */}
            <h3>

                {titulo}

            </h3>


            {/* valor do indicador */}
            <p>

                {valor}

            </p>


        </div>

    );

}