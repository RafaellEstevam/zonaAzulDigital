import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeiculosPageRoutingModule } from './veiculos-routing.module';

import { VeiculosPage } from './veiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeiculosPageRoutingModule
  ],
  declarations: [VeiculosPage]
})
export class VeiculosPageModule {}
