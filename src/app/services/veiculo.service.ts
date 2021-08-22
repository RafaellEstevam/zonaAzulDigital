import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Cor } from '../veiculos/create/create.page';


export interface Veiculo{
  id: number;
  marca: Marca;
  modelo: Modelo;
  placa: String;
  cor: Cor;
}

export interface Marca{
  id: number;
  nome: String;
}

export interface Modelo{
  id: number;
  nome: String;
  marcaId: number;
  urlImgModelo: String;
}


@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private chaveSequencialVeiculos: number = 1;

  public veiculos : Veiculo[]= [
   
  ]


  public marcas: Marca[] = [
    {
     id: 1,
     nome: "Honda"
    },
    {
     id: 2,
     nome: "Toyota"
    },
    {
     id: 3,
     nome: "Jeep",
    },
   ]

   private modelos: Modelo[] = [
    //Honda
    {
      id:1,
      nome: "Accord",
      marcaId: 1,
      urlImgModelo: "https://svg-image.s3.amazonaws.com/south-honda/019-0121-SHO873/model1.png"
   },
    {
      id:2,
      nome: "City",
      marcaId: 1,
      urlImgModelo: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Honda-City.png"
    },
    {
      id:3,
      nome: "Civic", 
      marcaId: 1,
      urlImgModelo: "https://images.dealer.com/ddc/vehicles/2020/Honda/Civic%20Si/Sedan/perspective/front-left/2020_76.png"
    },
    {
      id:4,
      nome: "Cr-V", 
      marcaId: 1,
      urlImgModelo: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/14219/2020-Honda-CR-V-front_14219_032_1843x887_BU_cropped.png"
    },
    {
      id:5,
      nome: "Fit", 
      marcaId: 1,
      urlImgModelo: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/12183/2020-Honda-Fit-front_12183_032_1857x884_OR_cropped.png"
    },
    {
      id:6,
      nome: "Hr-V", 
      marcaId: 1,
      urlImgModelo: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13026/2020-Honda-HR-V-front_13026_032_1848x876_BL_cropped.png"
    },
  
    //Toyota
   
    {
      id:7,
      nome: "Corolla", 
      marcaId: 2,
      urlImgModelo: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13483/2020-Toyota-Corolla-front_13483_032_1823x768_1F7_cropped.png"
    },
    {
      id:8,
      nome: "Yaris", 
      marcaId: 2,
      urlImgModelo: "https://cloudflarestockimages.dealereprocess.com/resrc/images/stockphoto_asset-c_limit,f_auto,fl_lossy,w_auto/v1/svp/Colors_PNG1280/2019/19toyota/19toyotayarislesd3ra/toyota_19yarislesd3ra_angularfront_graphite"
    },
    {
      id:9,
      nome: "Hilux", 
      marcaId: 2,
      urlImgModelo: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/hilux-sr5-my21-index-1.png"
    },
    {
      id:10,
      nome: "Hilux Sw4", 
      marcaId: 2,
      urlImgModelo: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Toyota-Fortuner_1.png"
    },
    {
      id:11,
      nome: "Rav-4", 
      marcaId: 2,
      urlImgModelo: "https://images.dealer.com/ddc/vehicles/2020/Toyota/RAV4%20Hybrid/SUV/perspective/front-left/2020_76.png"
    },
    
    //Jeep
    {
      id:12,
      nome: "Cherokee",
      marcaId: 3,
      urlImgModelo: "http://assets-clean.local-car-finder.com/images/14039/14039_st1280_089.png"
    },
    {
      id:13,
      nome: "Compass", 
      marcaId: 3,
      urlImgModelo: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Jeep-Compass_0.png"
    },
    {
      id:14,
      nome: "Renegade",
      marcaId: 3,
      urlImgModelo: "https://www.newsedan.com.br/pub/modelos/jeep/renegade/colorizer/colorizer-renegade-limited-metalica-deep-brown.png"
    },
  ]

  constructor(private storage : Storage) {
    this.loadFromStorage();
   }


   private async loadFromStorage(){
      const storedVeiculos = await this.storage.get("veiculos") as Veiculo[];

      if(storedVeiculos){
        this.veiculos.push(...storedVeiculos);
        this.chaveSequencialVeiculos = this.calcularMaxId()+1;
      }
   }

   private calcularMaxId() : number{
    const idList : number[] = [
    ]

    this.veiculos.forEach(veiculo =>{
       idList.push(veiculo.id);
    });

    return Math.max(...idList);
  }

   private atualizarStorage(){
     this.storage.set("veiculos", this.veiculos);
   }

  public getModelosByMarcaId(id:number): Modelo[]{
    var modelosDaMarca: Modelo[]=[
      
    ]

    this.modelos.forEach(modelo => {
      if(modelo.marcaId === id){
        modelosDaMarca.push(modelo);
      }
  });
    return modelosDaMarca;
  }

  public getMarcaById(id : number): Marca{
    return this.marcas.find(m => m.id === id);
  }

  public getModeloById(id: number) : Modelo{
    return this.modelos.find(m => m.id === id);
  }


  public salvarVeiculo(veiculo : Veiculo){
    veiculo.id= this.chaveSequencialVeiculos;
    this.veiculos.push(veiculo);
    this.atualizarStorage();
    this.chaveSequencialVeiculos++;
  }

  public getVeiculoById(id: number) : Veiculo{
    return {...this.veiculos.find(v => v.id === id)};
  }

  public atualizarVeiculo(veiculo : Veiculo){
    const index = this.veiculos.findIndex(v => v.id === veiculo.id);
    this.veiculos[index] = veiculo;
    this.atualizarStorage();
  }

  public removerVeiculo(id : number){
    const index = this.veiculos.findIndex(v => v.id === id);
    this.veiculos.splice(index,1);
    this.atualizarStorage();
  }

}
