import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.page.html',
  styleUrls: ['./comprovante.page.scss'],
})
export class ComprovantePage implements OnInit {

  public placa;
  public endereco;
  public dataHora;

  constructor(private route: ActivatedRoute) { 

  }

   ngOnInit() {
   this.route.queryParams.subscribe(
    (queryParams: any) => {
      this.placa =  queryParams['placa'];
      this.endereco = queryParams['endereco'];
      this.dataHora = queryParams['dataHora'];
    }
   );
}

}
