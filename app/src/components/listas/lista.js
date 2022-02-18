import React from "react";
import 'C:\\Users\\jessica\\Documents\\App\\app\\src\\App.css'
import FormDialog from "../dialog/dialog";

export default function Lista(props){
    const[open, SetOpen] = React.useState(false);

    // Aparecer janela quando clicar em um botão
    const handleClicklista = () => {
        SetOpen(true);
    };

    return (
    <>
    <FormDialog open = {open} SetOpen = {SetOpen} nome={props.nome} preco={props.preco} descricao={props.descricao} 
    listprodutos = {props.listprodutos} setListprodutos = {props.setListprodutos}  id = {props.id}  datacriacao = {props.datacriacao} data_atualizacao = {props.data_atualizacao}/>
    <div className="listaprodutos" onClick={()=> handleClicklista ()}>
        <p className="idprod">{props.id}</p>
        <p className="nome">Nome do produto: {props.nome}</p>
        <p className="preco">R${props.preco}</p>
        <p className="descricao">Descrição: {props.descricao}</p>
    </div>
    </>
    );
}
