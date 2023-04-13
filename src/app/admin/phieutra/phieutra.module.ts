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
    ],
    exports: [
        PhieuTraComponent
    ],
    declarations: [
        PhieuTraComponent
    ],
})
export class PhieuTraModule {}
