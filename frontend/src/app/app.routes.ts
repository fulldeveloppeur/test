import { Routes } from '@angular/router';
import { DevisComponent } from './devis/devis.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'devis', component: DevisComponent },
];
