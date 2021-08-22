import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartaoService } from '../services/cartao.service';
import { CompraService } from '../services/compra.service';
import { VeiculoService } from '../services/veiculo.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public cartoesCadastrados = this.cartaoService.cartoesCadastrados;
  public veiculosCadastrados = this.veiculoService.veiculos;


  constructor(private alertController : AlertController , private cartaoService : CartaoService, private veiculoService : VeiculoService,
      private compraService : CompraService, private router: Router) { 
  }

  ngOnInit() {
  } 



  public checarListas(){
    if(this.cartoesCadastrados.length == 0 || this.veiculosCadastrados.length == 0){
      this.dispararAlerta();
    }else{
      this.router.navigate(['/map']); 
    }
    
  }

  public checarHistorico(){
    if(this.compraService.compras.length == 0){
      this.dispararAlerta2();
    }else{
      this.router.navigate(['/compras']);
    }
    
  }

  private async dispararAlerta(){
    const alert = await this.alertController.create({
      header: "Atenção!",
      message: "Você precisa cadastrar um cartão e um veículo para usar essa funcionalidade!",
      buttons:["OK"]
    });

    alert.present();
  }

  private async dispararAlerta2(){
    const alert = await this.alertController.create({
      message: "Ops, parece que você não tem nenhuma compra para ser exibida!",
      buttons:["OK"]
    });

    alert.present();
  }


}
