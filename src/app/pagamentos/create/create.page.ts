import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Bandeira, Cartao, CartaoService } from 'src/app/services/cartao.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {


  public nomeTitular: String;
  public numeroCartao: String;
  public bandeiraSelecionadaId : number;
  public validade: Date;
  public codSeguranca: number;
  public cpf: String;

  private novoCartao : Cartao = {
    id: null,
    nomeTitular: "", 
    numero: null,
    final: "",
    bandeira: null,
    validade: null,
    codSeguranca: null,
    cpf:""
  };

  public bandeiras : Bandeira[] = this.cartaoService.bandeiras;

 
  constructor(private cartaoService : CartaoService , private alertController : AlertController, private navController : NavController) {
  
   }

  ngOnInit() {
  }


  public cadastrarCartao(){
    
    if(this.nomeTitular === undefined || this.numeroCartao === undefined || this.bandeiraSelecionadaId === null 
      || this.bandeiraSelecionadaId === undefined || this.validade === null || this.validade === undefined || this.codSeguranca === undefined || this.cpf === undefined){
      this.dispararAlerta();
    }else{
      if(this.nomeTitular.trim().length == 0 || this.numeroCartao.trim().length == 0 || this.cpf.trim().length == 0){
        this.dispararAlerta();
      }else if(this.numeroCartao.length != 16){
        this.dispararAlerta2();
      }else{

        let bandeira = this.cartaoService.getBandeiraById(this.bandeiraSelecionadaId);
        let final = this.cartaoService.getFinalNumeroCartao(this.numeroCartao);

        this.novoCartao.nomeTitular = this.nomeTitular;
        this.novoCartao.numero = this.numeroCartao;
        this.novoCartao.final = final;
        this.novoCartao.bandeira = bandeira;
        this.novoCartao.validade = this.validade;
        this.novoCartao.codSeguranca = this.codSeguranca;
        this.novoCartao.cpf= this.cpf;
    
        this.cartaoService.cadastrarCartao(this.novoCartao);
        this.navController.back();
      }
    }

    
  }

  private async dispararAlerta(){
    const alert = await this.alertController.create({
      header: "Atenção!",
      message: "Preencha o formulário corretamente!",
      buttons:["OK"]
    });
  
    alert.present();
  }

  private async dispararAlerta2(){
    const alert = await this.alertController.create({
      header: "Atenção!",
      message: "O número do cartão deve ser composto por 16 dígitos, sem espaços!",
      buttons:["OK"]
    });
  
    alert.present();
  }

}




