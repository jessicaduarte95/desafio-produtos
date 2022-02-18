import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Lista from './components/listas/lista';

function App() {

  const [listprodutos, setListprodutos] =useState();

// Função para colocar os valores nos campos nome, preço e descrição
  const [valores, setValores] = useState();

  const handleChangeValores = (valor) => {
    setValores(prevValor => ({
      ...prevValor,
      [valor.target.name]: valor.target.value,
    }));
  };


// Função do Botão
  const ClickBotao = () => {
    
    // Endereço para fazer a requisição
    Axios.post("http://localhost:3001/cadastro", {
      nome: valores.nome,
      preco: valores.preco,
      descricao: valores.descricao,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getListas").then((response) => {
      setListprodutos(response.data);
    });
  },[]);


// Esrtrutura da Página
  return (
    <div className="container">
      <div className='parteSuperior'>Best Sale</div>
      <div className="cadastro">
        <h1 className="titulo"> Cadastro de Produtos</h1>
        <div className="inserir">
        <input type="text" name='nome' placeholder="Nome do Produto" className="registro"
        onChange={handleChangeValores} style = {{width: '600px'}} />
        </div>

        <div className="inserir">
        <input type="text" name='preco' placeholder="Preço (R$)" className="registro"
        onChange={handleChangeValores} style = {{width: '600px'}} /></div>
        

        <div className="inserir">
        <input type="text" name='descricao' placeholder="Descrição" className="registro"
        onChange={handleChangeValores} style = {{width: '600px'}} /></div>

        <button className="botao" onClick={() => ClickBotao()} style = {{width: '150px'}} >Criar Produto</button>
        <h1 className="listatitulo">Lista de Produtos</h1>
        <p className='texto'>Caso queira editar, excluir ou ver detalhes da lista, basta clicar no item desejado.</p>
      </div>

      {typeof listprodutos !== "undefined" && listprodutos.map((value) => {
        return <Lista 
        key ={value.id} 
        listLista = {listprodutos} 
        setListLista = {setListprodutos}
        id = {value.id}
        nome = {value.nome}
        preco = {value.preco}
        descricao = {value.descricao}
        datacriacao = {value.datacriacao}
        data_atualizacao = {value.data_atualizacao}
        ></Lista>
      })};
      
    </div>
  );
};

export default App;