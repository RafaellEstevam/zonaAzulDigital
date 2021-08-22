import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprovantePage } from './comprovante.page';

const routes: Routes = [
  {
    path: '',
    component: ComprovantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprovantePageRoutingModule {}
