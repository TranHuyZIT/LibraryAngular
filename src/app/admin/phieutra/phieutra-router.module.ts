import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PhieuTraComponent } from './phieutra.component';

const routes = [
    {
        path: '',
        component: PhieuTraComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhieuTraRoutingModule {}
