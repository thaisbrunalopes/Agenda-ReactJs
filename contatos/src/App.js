import React, { Component, useMemo } from 'react';
import './App.css';
import * as EmailValidator from 'email-validator';
 
class App extends Component {
 
    constructor(){
        super();
 
        this.state={
            nome:"",
            numero:"",
            email: "",

            agenda:[
                {nome: "Tulio Pereira", numero: "57986597586", email: "tuliopereira123@hotmail.com"},
                {nome: "Julia da Silva", numero: "41993968978", email: "juliadasilva@gmail.com"},
                {nome: "Ana Beatriz Moura", numero: "98998567589", email: "anabeatriz.m@gmail.com"},
                {nome: "Paulo Pereira", numero: "45998659758", email: "eupaulopereira@hotmail.com"},
                {nome: "Natalia Oliveira da Silva", numero: "35968698596", email: "nataliaoliveira1989@gmail.com"},
                ],
            mostrarFormulario:false,
            edicao:false,
            indexEdicao: '',
            pesquisa:'',
            agendaCompleta:[],
        }
 
        this.mudancaNome=(event)=>{
            this.setState({
                nome:event.target.value
            })
        }
 
        this.mudancaNumero=(event)=>{
            this.setState({
                numero:event.target.value
            })
        }
 
        this.mudancaEmail=(event)=>{
            this.setState({
                email:event.target.value
            })
        }
 
        this.addContact=()=>{
 
            const novoContato={
                nome:this.state.nome,
                numero:this.state.numero,
                email:this.state.email,
            }
 
            if(novoContato.nome==="")
            {
                alert('Nome é obrigatório');
                return;
            }
 
            if(novoContato.numero==="")
            {
                alert('Número é obrigatório');
                return;
            }
 
            if(!EmailValidator.validate(novoContato.email))
            {
                alert('Email não pode ser vazio ou contar formato inválido');
                return;
            }
 
            this.setState( (prevState)=>({
                agenda:prevState.agenda.concat(novoContato),
                nome:"",
                numero:"",
                email: "",
            }))                       
        }
        this.removerContato = (index)=>{
            this.state.agenda.splice(index, 1)
            this.setState({
                agenda: this.state.agenda
            })            
        }
        this.editarContato = (index)=>{
            this.state.edicao = true
            this.state.indexEdicao = index
            if(!this.state.mostrarFormulario) this.toggleMostrarFormulario()
            this.setState({
                nome:this.state.agenda[index].nome,
                numero:this.state.agenda[index].numero,
                email:this.state.agenda[index].email,

            })
        }
        this.salvaContato = () =>{
            
            if(this.state.nome==="")
            {
                alert('Nome é obrigatório');
                return;
            }
 
            if(this.state.numero==="")
            {
                alert('Número é obrigatório');
                return;
            }
 
            if(!EmailValidator.validate(this.state.email))
            {
                alert('Email não pode ser vazio ou contar formato inválido');
                return;
            }
            this.state.agenda[this.state.indexEdicao].nome = this.state.nome
            this.state.agenda[this.state.indexEdicao].email = this.state.email
            this.state.agenda[this.state.indexEdicao].numero = this.state.numero
            this.state.edicao = false
            this.state.indexEdicao = ''
            this.toggleMostrarFormulario()
            this.setState({
                agenda: this.state.agenda,
                nome:'',
                email:'',
                numero:'',
            })            
        }
        this.criarContato=()=>{
            this.state.edicao=false
            this.setState({
                nome:'',
                email:'',
                numero:'',

            })
            this.state.agendaCompleta = []  
            if(!this.state.mostrarFormulario) this.toggleMostrarFormulario()
        }
        this.toggleMostrarFormulario=()=>{
            this.setState(
                { mostrarFormulario: !this.state.mostrarFormulario}
            )
        }
        this.pesquisa=(event)=>{
            if(!this.state.agendaCompleta.length) this.state.agendaCompleta=this.state.agenda
            this.setState({
                pesquisa:event.target.value,
                agenda:this.state.agendaCompleta.filter((contato)=>contato.nome.toLowerCase().includes(this.state.pesquisa.toLowerCase()))
            })
            console.log(event)
            console.log(event.target.value, event.target.value.length)
            if(event.target.value.length===0){
                this.setState({
                    agenda:this.state.agendaCompleta
                })
            }
        }    
                                 
    }
    
 
  render() {

      let form=null;
      if(this.state.mostrarFormulario)
      {
          form=
             (  
              <div className="container">
              <form className="form">
              <div class="form-group">
                <input type="text" className="form-control" onChange={this.mudancaNome} value={this.state.nome} placeHolder="Nome" maxLength={50} />
              </div>
              <div class="form-group">
                <input type="text" className="form-control" onChange={this.mudancaNumero} value={this.state.numero} placeHolder="Número" onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} maxLength={12}/>
              </div>
              <div class="form-group">
                <input type="text" className="form-control" onChange={this.mudancaEmail} value={this.state.email} placeHolder="Email"/>
              </div>
              <button type="button" className="btnbtn-primary" onClick={this.state.edicao ? this.salvaContato:this.addContact}>{this.state.edicao ? "Salvar": "Adicionar"}</button>
            </form>
              </div>
          )
      }
 
    return (
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-4"></div>
 
 
        <div className="col-md-4">
        <div className="App">
        <h1 className="header">Contatos</h1>
        <div class="form-group">
            <input type="text" className="form-control" onChange={this.pesquisa} value={this.state.pesquisa} placeHolder="Pesquisa..." maxLength={50} />
        </div>
        <span style={{cursor:"pointer",color:"blue",textDecoration:"underline", color:"black", fontFamily:"arial", display:"flow", textAlign:"center"}} onClick={this.criarContato}>Criar Novo Contato</span>
 
        {form}
 
        {this.state.agenda.sort((a,b)=>a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())).map((contato,index) =>
           <div className="contacts">
           <h5 class="mb-3">Nome: {contato.nome}</h5>
           <p class="mb-0">Telefone: {contato.numero}</p>
           <p>Email: {contato.email}</p>
           <button className='editar' disabled={this.state.edicao || this.state.pesquisa.length} onClick={()=>this.editarContato(index)}>Editar</button> 
           <button className='excluir' disabled={this.state.edicao || this.state.pesquisa.length} onClick={()=>this.removerContato(index)} >Excluir</button>
           <hr/>
          </div>
        )}
        </div>
        </div>
            
 
     <div className="col-md-4"></div>
     </div>
     </div>
    );
  }
}
 
export default App