import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookMgmtComponent } from './bookManagement.component';
import { BookManagementRoutingModule } from './bookManagement-router.module';
import { BookComponent } from './book/book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BookFormComponent } from './book/form/bookForm.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/categoryForm/categoryForm.component';

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
    exports: [
        BookMgmtComponent,
        BookComponent,
        BookFormComponent,
        CategoryComponent,
        CategoryFormComponent
    ],
    declarations: [
        BookMgmtComponent,
        BookComponent,
        BookFormComponent,
        CategoryComponent,
        CategoryFormComponent
    ],
})
export class BookManagementModule {}
