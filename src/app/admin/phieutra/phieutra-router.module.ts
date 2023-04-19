import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PhieuTraComponent } from './phieutra.component';
import PhieuTraView from './view/PhieuTraView';

const routes = [
    {
        path: '',
        component: PhieuTraView,
    },
    {
        path: 'detail/add',
        component: PhieuTraComponent,
    },
    {
        path: 'detail/:slug',
        component: PhieuTraComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhieuTraRoutingModule {}
