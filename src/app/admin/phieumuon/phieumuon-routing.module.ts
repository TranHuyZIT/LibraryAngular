import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PhieuMuonComponent } from './phieumuon.component';
import PhieuMuonViewComponent from './view/PhieuMuonView';

const routes = [
    {
        path: '',
        component: PhieuMuonViewComponent,
    },
    {
        path: 'detail/add',
        component: PhieuMuonComponent,
    },
    {
        path: 'detail/:slug',
        component: PhieuMuonComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhieuMuonRoutingModule {}
