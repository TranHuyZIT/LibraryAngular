import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/services/admin-guard.service';
import { AuthGuard } from './core/services/auth-guard.service';
import { IndexComponent } from './home/index/index.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
            import('./home/index/index.module').then((m) => m.IndexModule),
    },
    {
        path: 'home',
        children: [
            {
                path: '',
                canActivate: [],
                loadChildren: () =>
                    import('./home/index/index.module').then(
                        (m) => m.IndexModule
                    ),
            },
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
            {
                path: 'phieutra',
                canActivate: [],
                loadChildren: () =>
                    import('./admin/phieutra/phieutra.module').then(
                        (m) => m.PhieuTraModule
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
