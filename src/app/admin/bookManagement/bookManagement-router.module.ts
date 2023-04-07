import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/services/admin-guard.service';
import { BookMgmtComponent } from './bookManagement.component';
import { CategoryComponent } from './category/category.component';

const routes = [
    {
        path: '',
        component: BookMgmtComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookManagementRoutingModule {}
