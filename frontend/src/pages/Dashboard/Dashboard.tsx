import Card from "../../components/Card/Card";

import "./Dashboard.css";


export default function Dashboard() {


    // tela inicial da aplicação
    


    return (

        <div>


            <h1>
                Dashboard
            </h1>


            <p>
                Visão geral dos gastos residenciais.
            </p>


            <div className="cards-container">


                <Card
                    titulo="Pessoas"
                    valor="5 cadastradas"
                />


                <Card
                    titulo="Receitas"
                    valor="R$ 10.000,00"
                />


                <Card
                    titulo="Despesas"
                    valor="R$ 4.500,00"
                />


                <Card
                    titulo="Saldo"
                    valor="R$ 5.500,00"
                />


            </div>


        </div>

    );

}