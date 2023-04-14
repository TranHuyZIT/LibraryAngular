import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { LibrarianComponent } from './librarian.component';
import { LibrarianRoutingModule } from './librarian-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, SharedModule, LibrarianRoutingModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, FormsModule, ReactiveFormsModule],
    exports: [LibrarianComponent],
    declarations: [LibrarianComponent],
})
export class LibrarianModule {}
