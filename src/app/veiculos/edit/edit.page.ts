import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Marca, Modelo, VeiculoService } from 'src/app/services/veiculo.service';

type Cor = "Prata" | "Preto" | "Branco" | "Cinza" | "Azul" | "Verde" | "Vermelho" | "Amarelo" | "Marrom" ;


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  
  public marcas = this.veiculoService.marcas;

  public modelosDaMarca : Modelo[] = [ 
  ]


  public marcaId;
  public modeloId;

  public veiculo;

  constructor(private veiculoService : VeiculoService ,private route : ActivatedRoute , private alertController : AlertController, private navController : NavController) {
    const id = + route.snapshot.paramMap.get("id");
    this.veiculo = this.veiculoService.getVeiculoById(id);
    this.marcaId = this.veiculo.marca.id;
    this.carregarModelos();
    this.modeloId = this.veiculo.modelo.id;
   }

  ngOnInit() {
  }

  public carregarModelos(){
    this.limparListaModelosDaMarca();
    this.modeloId = null;   
    this.modelosDaMarca = this.veiculoService.getModelosByMarcaId(this.marcaId);//marca id está sendo carregado no construtor.

  }

  private limparListaModelosDaMarca(){
    while(this.modelosDaMarca.length > 0){
      this.modelosDaMarca.pop();
    }
  } 

  public atualizarVeiculo(){

    if(this.veiculo.placa.trim().length != 0 && this.veiculo.placa != undefined
     && this.veiculo.placa.length == 8 && this.veiculo.cor != undefined && this.marcaId != undefined && this.modeloId != undefined){
      this.veiculo.marca = this.veiculoService.getMarcaById(this.marcaId);
      this.veiculo.modelo = this.veiculoService.getModeloById(this.modeloId);
      this.veiculoService.atualizarVeiculo(this.veiculo);
      this.navController.back();
      
    }else{
      this.dispararAlerta();
    }
    
  }

  public removerVeiculo(){
    this.veiculoService.removerVeiculo(this.veiculo.id);
    this.navController.back();
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
