import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/navbar/header.component';
import { BannerComponent } from './layout/banner/banner.component';
import { ShowAuthedDirective } from './directives/showAuthed.directive';
import { ShowAdminDirective } from './directives/showAdmin.directive';
@NgModule({
    imports: [MatToolbarModule, MatIconModule, RouterModule],
    declarations: [
        BannerComponent,
        HeaderComponent,
        ShowAuthedDirective,
        ShowAdminDirective,
    ],
    exports: [BannerComponent, HeaderComponent],
})
export class SharedModule {}
