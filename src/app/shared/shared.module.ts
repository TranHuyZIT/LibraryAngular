import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/navbar/header.component';
import { BannerComponent } from './layout/banner/banner.component';
import { ShowAuthedDirective } from './directives/showAuthed.directive';
import { ShowAdminDirective } from './directives/showAdmin.directive';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './layout/navbar-admin/header.component';
@NgModule({
    imports: [MatToolbarModule, MatIconModule, RouterModule, CommonModule],
    declarations: [
        BannerComponent,
        HeaderComponent,
        HeaderAdminComponent,
        ShowAuthedDirective,
        ShowAdminDirective,
    ],
    exports: [BannerComponent, HeaderComponent, HeaderAdminComponent],
})
export class SharedModule {}
