import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PhieuMuonComponent } from './phieumuon.component';

const routes = [
    {
        path: '',
        component: PhieuMuonComponent,
    },
];
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PhieuMuonComponent } from './phieumuon.component';

const routes = [
    {
        path: '',
        component: PhieuMuonComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhieuMuonRoutingModule {}

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhieuMuonRoutingModule {}
