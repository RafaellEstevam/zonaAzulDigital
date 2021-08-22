import { Component, OnInit } from '@angular/core';
import { Compra, CompraService } from '../services/compra.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {


  public compras = this.compraService.compras;
  

  constructor(private compraService : CompraService) { 
  }

  ngOnInit() {
  }







}
