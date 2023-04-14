import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { BookModule } from 'src/app/admin/bookManagement/book/book.module';

@NgModule({
    imports: [CommonModule, SharedModule, IndexRoutingModule, BookModule],
    declarations: [IndexComponent],
    exports: [IndexComponent],
})
export class IndexModule {}
