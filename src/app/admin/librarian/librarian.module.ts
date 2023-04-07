import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibrarianComponent } from './librarian.component';
import { LibrarianRoutingModule } from './librarian-routing.module';

@NgModule({
    imports: [CommonModule, SharedModule, LibrarianRoutingModule],
    exports: [LibrarianComponent],
    declarations: [LibrarianComponent],
})
export class LibrarianModule {}
