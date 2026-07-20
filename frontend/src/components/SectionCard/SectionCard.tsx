import type { ReactNode } from "react";


import "./SectionCard.css";




interface Props {


    titulo?: string;


    children: ReactNode;


}






// componente padrão para agrupamento
// de conteúdos dentro das páginas

export default function SectionCard({


    titulo,


    children



}: Props) {



    return (



        <section className="section-card">






            {

                titulo && (


                    <h2>


                        {titulo}


                    </h2>


                )


            }







            <div className="section-card-content">


                {children}


            </div>






        </section>


    );


}