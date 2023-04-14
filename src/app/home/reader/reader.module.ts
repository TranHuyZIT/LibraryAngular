import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { SharedModule } from 'src/app/shared/shared.module';
import { ReaderComponent } from './reader.component';
import { ReaderRoutingModule } from './reader-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReaderRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ], // Add ReactiveFormsModule to imports
    exports: [ReaderComponent],
    declarations: [ReaderComponent],
})
export class ReaderModule {}
