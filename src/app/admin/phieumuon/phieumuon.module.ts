import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { PhieuMuonComponent } from './phieumuon.component';
import { PhieuMuonRoutingModule } from './phieumuon-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    imports: [CommonModule, SharedModule, PhieuMuonRoutingModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatSelectModule, NgxMatSelectSearchModule],
    exports: [PhieuMuonComponent, SelectComponent],
    declarations: [PhieuMuonComponent, SelectComponent],
})
export class PhieuMuonModule {}