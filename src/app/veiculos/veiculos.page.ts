import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.page.html',
  styleUrls: ['./veiculos.page.scss'],
})
export class VeiculosPage implements OnInit {


  public veiculos = this.veiculoService.veiculos;
  
  constructor(private veiculoService : VeiculoService) {

   }

  ngOnInit() {
  }

}
