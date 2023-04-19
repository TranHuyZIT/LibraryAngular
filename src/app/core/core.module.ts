import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth-guard.service';
import { JwtService } from './services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { HandleResponseInterceptor } from './interceptors/http.handleResponse.interceptor';
import { AuthService } from './services/auth.service';
import { AdminGuard } from './services/admin-guard.service';
import { RouterModule } from '@angular/router';
import { CategoryService } from './services/category.service';
import { BookService } from './services/books.service';
import { ImageService } from './services/image.service';

// <<<<<<< HEAD
import { ReaderService } from './services/reader.service';

import { CartService } from './services/cart.service';
import { BookItemService } from './services/bookitem.service';
import { PhieuTraService } from './services/phieutra.service';
import { LibrarianService } from './services/librarian.service';
import { PhieuMuonService } from './services/phieumuon.service';
import { PhieuGiaHanService } from './services/phieugiahan.service';
import { LogService } from './services/log.service';

@NgModule({
    imports: [CommonModule, RouterModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HandleResponseInterceptor,
            multi: true,
        },
        ApiService,
        AuthService,
        AuthGuard,
        AdminGuard,
        ImageService,
        JwtService,
        CategoryService,
        BookService,
        BookItemService,
        LibrarianService,
        PhieuTraService,
        ReaderService,
        CartService,
        PhieuMuonService,
        PhieuGiaHanService,
        LogService,
    ],
    declarations: [],
})
export class CoreModule {}
