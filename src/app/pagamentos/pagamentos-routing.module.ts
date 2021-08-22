import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagamentosPage } from './pagamentos.page';

const routes: Routes = [
  {
    path: '',
    component: PagamentosPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagamentosPageRoutingModule {}
