import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Cartao{
  id: number;
  nomeTitular: String;
  numero: String;
  final: String;
  bandeira: Bandeira;
  validade: Date;
  codSeguranca: number;
  cpf: String;

  
}

export interface Bandeira{
  id: number;
  nome: String;
  urlImagem: String;

  
}

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private chaveSequencialCartoes: number = 1;

  public cartoesCadastrados : Cartao[]=[

  ]

  public bandeiras : Bandeira[] = [
    {
      id:1,
      nome: "Mastercard",
      urlImagem: "https://pngimg.com/uploads/mastercard/mastercard_PNG21.png"
    },
    {
      id:2,
      nome: "Visa",
      urlImagem: "https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png"
    },
    {
      id:3,
      nome: "Elo",
      urlImagem: "https://i.pinimg.com/originals/61/e1/e9/61e1e92d1cba837bba6f64f1a03a9b8e.png"
    }
  ]


  constructor(private storage : Storage) {
    this.loadFromStorage();
   }

   private async loadFromStorage(){
     const storedCartoes = await this.storage.get("cartoes") as Cartao[];
     
     if(storedCartoes){
       this.cartoesCadastrados.push(...storedCartoes);
       this.chaveSequencialCartoes = this.calcularMaxId()+1;
     }
     
   }

   private calcularMaxId() : number{
     const idList : number[] = [
     ]

     this.cartoesCadastrados.forEach(cartao =>{
        idList.push(cartao.id);
     });

     return Math.max(...idList);
   }


   private atualizarStorage(){
     this.storage.set("cartoes", this.cartoesCadastrados);
   }


  public removerCartao(id : number){
    const index = this.cartoesCadastrados.findIndex(c => c.id === id);
    this.cartoesCadastrados.splice(index,1);
    this.atualizarStorage();
  }

  public getBandeiraById(id : number) : Bandeira{
    return {...this.bandeiras.find(b => b.id === id)};
  }

  public getFinalNumeroCartao(numeroCartao : String) : String{
    return numeroCartao.substring(12);
  }

  public cadastrarCartao(cartao : Cartao){
    cartao.id= this.chaveSequencialCartoes;
    this.cartoesCadastrados.push(cartao);
    this.atualizarStorage();
    this.chaveSequencialCartoes++;
  }

}
