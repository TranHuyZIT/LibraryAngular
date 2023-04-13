import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookManagementRoutingModule } from '../bookManagement-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BookComponent } from './book.component';
import { BookFormComponent } from './form/bookForm.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BookManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
    ],
    declarations: [BookComponent, BookFormComponent],
    exports: [BookComponent, BookFormComponent],
})
export class BookModule {}
