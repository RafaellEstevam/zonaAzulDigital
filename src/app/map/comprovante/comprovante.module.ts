import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprovantePageRoutingModule } from './comprovante-routing.module';

import { ComprovantePage } from './comprovante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprovantePageRoutingModule
  ],
  declarations: [ComprovantePage]
})
export class ComprovantePageModule {}
