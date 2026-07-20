import "./PageContainer.css";


interface Props {

    children: React.ReactNode;

}



export default function PageContainer({

    children

}: Props) {


    return (

        <div className="page-container">

            {children}

        </div>

    );

}