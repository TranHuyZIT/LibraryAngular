import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { PhieuMuonComponent } from './phieumuon.component';
import { PhieuMuonRoutingModule } from './phieumuon-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, SharedModule, PhieuMuonRoutingModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, FormsModule, ReactiveFormsModule],
    exports: [PhieuMuonComponent],
    declarations: [PhieuMuonComponent],
})
export class PhieuMuonModule {}