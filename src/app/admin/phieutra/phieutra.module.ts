import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PhieuTraComponent } from './phieutra.component';
import { PhieuTraRoutingModule } from './phieutra-router.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectComponent } from './select/select.component';
import PhieuTraView from './view/PhieuTraView';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PhieuTraRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        NgxPaginationModule,
    ],
    exports: [PhieuTraComponent, SelectComponent, PhieuTraView],
    declarations: [PhieuTraComponent, SelectComponent, PhieuTraView],
})
export class PhieuTraModule {}
