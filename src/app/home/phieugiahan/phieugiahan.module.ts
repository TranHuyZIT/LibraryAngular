import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhieuGiaHanComponent } from './phieugiahan.component';
import { PhieuGiaHanRoutingModule } from './phieugiahan-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectComponent } from './select/select.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PhieuGiaHanRoutingModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
    ],
    exports: [PhieuGiaHanComponent, SelectComponent],
    declarations: [PhieuGiaHanComponent, SelectComponent],
})
export class PhieuGiaHanModule {}
