import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Marca, Modelo, Veiculo, VeiculoService } from 'src/app/services/veiculo.service';

export type Cor = "Prata" | "Preto" | "Branco" | "Cinza" | "Azul" | "Verde" | "Vermelho" | "Amarelo" | "Marrom" ;


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  
  public novoVeiculo: Veiculo = {
    id: null,
    marca: null,
    modelo: null,
    placa: "",
    cor: null
  }

  public idMarcaSelecionada: number;
  public idModeloSelecionado: number;
  

  public marcas = this.veiculoService.marcas;

  public modelosDaMarca : Modelo[] =[
  ]

  constructor(private veiculoService: VeiculoService, private alertController : AlertController, private navController : NavController) { }

  ngOnInit() {
  }

  
  public carregarModelos(){
    this.limparListaModelosDaMarca();
    this.idModeloSelecionado = null;
    
    this.modelosDaMarca = this.veiculoService.getModelosByMarcaId(this.idMarcaSelecionada); // carrega os modelos aqui

  }

  public cadastrarVeiculo(){

    this.novoVeiculo.marca = this.veiculoService.getMarcaById(this.idMarcaSelecionada);
    this.novoVeiculo.modelo = this.veiculoService.getModeloById(this.idModeloSelecionado);

      if(this.novoVeiculo.placa != undefined && this.novoVeiculo.placa.trim().length != 0 && this.novoVeiculo.placa.length == 8 && 
      this.novoVeiculo.cor != undefined && this.idMarcaSelecionada != undefined && this.idModeloSelecionado != undefined){
        
        this.novoVeiculo.placa = this.novoVeiculo.placa.toUpperCase();
        this.veiculoService.salvarVeiculo(this.novoVeiculo);

        this.navController.back();

    }else{
      this.dispararAlerta();
    }
  }

  
  private limparListaModelosDaMarca(){
    while(this.modelosDaMarca.length > 0){
      this.modelosDaMarca.pop();
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


}
