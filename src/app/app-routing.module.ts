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
            {
                path: 'cart',
                canActivate: [],
                loadChildren: () =>
                    import('./home/cart/cart.module').then((m) => m.CartModule),
            },
            {
                path: 'phieugiahan',
                canActivate: [],
                loadChildren: () =>
                    import('./home/phieugiahan/phieugiahan.module').then(
                        (m) => m.PhieuGiaHanModule
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
                path: 'phieumuon',
                loadChildren: () =>
                    import('./admin/phieumuon/phieumuon.module').then(
                        (m) => m.PhieuMuonModule
                    ),
            },
            {
              path: 'phieutra',
                  canActivate: [],
                  loadChildren: () =>
                      import('./admin/phieutra/phieutra.module').then(
                          (m) => m.PhieuTraModule)
            }
            {
                path: 'phieumuon',
                canActivate: [],
                loadChildren: () =>
                    import('./admin/phieumuon/phieumuon.module').then(
                        (m) => m.PhieuMuonModule
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
