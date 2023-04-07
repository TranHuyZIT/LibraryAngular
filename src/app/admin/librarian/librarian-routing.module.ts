import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibrarianComponent } from './librarian.component';

const routes = [
    {
        path: '',
        component: LibrarianComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LibrarianRoutingModule {}
