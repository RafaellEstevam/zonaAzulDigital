import { Component, OnInit } from '@angular/core';
import { CartaoService } from '../services/cartao.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.page.html',
  styleUrls: ['./pagamentos.page.scss'],
})
export class PagamentosPage implements OnInit {

  public cartoesCadastrados = this.cartaoService.cartoesCadastrados;


  constructor(private cartaoService : CartaoService) {
  }

  ngOnInit() {
  }


  public removerCartao(cartaoId:number){
    
    this.cartaoService.removerCartao(cartaoId);
  }



}


