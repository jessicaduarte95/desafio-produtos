import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import 'C:\\Users\\jessica\\Documents\\App\\app\\src\\App.css';

export default function FormDialog(props) {

    const handleClose = () => {
        props.SetOpen(false)
    }

// Função para editar valores

    const Editar = () => {
        Axios.put("http://localhost:3001/editar",  {id: editarValores.id, nome: editarValores.nome, preco: editarValores.preco,
         descricao: editarValores.descricao, datacriacao: editarValores.datacriacao, data_atualizacao: editarValores.data_atualizacao});
         handleClose();
    };

    const [editarValores, setEditarValores] =useState ({
        id: props.id, nome: props.nome, preco: props.preco, descricao: props.descricao, datacriacao: props.datacriacao, data_atualizacao: props.data_atualizacao,
    });

    const handleChangeValores = (valor) => {
        setEditarValores(prevValor => ({
            ...prevValor,
            [valor.target.id]: valor.target.value,
        }));
    };

// Função para deletar dados

const deletar = () => {
    Axios.delete(`http://localhost:3001/delete/${editarValores.id}`)
    handleClose();
};

// Organizando a caixa de editar
  return (
    
    <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle id = "editar">Editar</DialogTitle>
        <DialogContent>
            <TextField id="id" label = "id" type = "text" fullWidth defaultValue={props.id}
            onChange = {handleChangeValores}/>
            <TextField id="nome" label = "Nome" type = "text" fullWidth defaultValue={props.nome}
            onChange = {handleChangeValores}/>
            <TextField id="preco" label = "Preço" type = "text" fullWidth defaultValue={props.preco}
            onChange = {handleChangeValores}/>
            <TextField id="descricao" label = "Descrição" type = "text" fullWidth defaultValue={props.descricao}
            onChange = {handleChangeValores}/>
            <TextField id="datacriacao" label = "Data de Criação (d/m/a)" type = "text" fullWidth defaultValue={props.datacriacao}
            onChange = {handleChangeValores}/>
            <TextField id="data_atualizacao" label = "Data de Atualização (d/m/a)" type = "text" fullWidth defaultValue={props.data_atualizacao}
            onChange = {handleChangeValores}/>

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={deletar}>Excluir</Button>
            <Button onClick={Editar}>Salvar Alteração</Button>
        </DialogActions>
    </Dialog>
  );
}