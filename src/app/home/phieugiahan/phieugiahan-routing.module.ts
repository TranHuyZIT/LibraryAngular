import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhieuGiaHanComponent } from './phieugiahan.component';

const routes: Routes = [
    {
        path: '',
        component: PhieuGiaHanComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhieuGiaHanRoutingModule {}
