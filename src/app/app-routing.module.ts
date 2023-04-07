import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/services/admin-guard.service';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
    {
        path: 'home',
        children: [
            {
                path: 'reader',
                canActivate: [],
                loadChildren: () =>
                    import('./home/reader/reader.module').then(
                        (m) => m.ReaderModule
                    ),
            },
        ],
    },
    {
        path: 'admin',
        children: [
            {
                path: 'book-mgmt',
                canActivate: [],
                loadChildren: () =>
                    import('./admin/bookManagement/bookManagement.module').then(
                        (m) => m.BookManagementModule
                    ),
            },
            {
                path: 'librarian',
                canActivate: [],
                loadChildren: () =>
                    import('./admin/librarian/librarian.module').then(
                        (m) => m.LibrarianModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
