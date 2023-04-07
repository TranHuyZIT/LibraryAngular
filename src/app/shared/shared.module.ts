import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/navbar/header.component';
import { BannerComponent } from './layout/banner/banner.component';
@NgModule({
    imports: [MatToolbarModule, MatIconModule, RouterModule],
    declarations: [BannerComponent, HeaderComponent],
    exports: [BannerComponent, HeaderComponent],
})
export class SharedModule {}
