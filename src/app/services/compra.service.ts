import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Compra{
  id: number;
  placaVeiculo : String;
  localizacao: String;
  dataHora: Date;
}




@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private storage : Storage) { 
    this.loadFromStorage();
  }

  private chaveSequencialCompras: number = 1;

  public compras : Compra[] = [

  ]

    public salvar(compra : Compra){
      compra.id = this.chaveSequencialCompras;
      this.compras.push(compra);

      this.storage.set('compras', this.compras);

      this.chaveSequencialCompras++;
    }



    private async loadFromStorage(){
        const storedCompras =  await this.storage.get("compras") as Compra[];

      if(storedCompras){
          this.compras.push(...storedCompras);
          this.chaveSequencialCompras = this.calcularMaxId() + 1;
      }

    }


    private calcularMaxId() : number{
      const idList : number[] = [
      ]

      this.compras.forEach(compra =>{
        idList.push(compra.id);
      });

      return Math.max(...idList);
    }
  }
