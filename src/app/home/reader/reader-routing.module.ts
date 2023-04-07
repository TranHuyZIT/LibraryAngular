import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReaderComponent } from './reader.component';

const routes = [
    {
        path: '',
        component: ReaderComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReaderRoutingModule {}
