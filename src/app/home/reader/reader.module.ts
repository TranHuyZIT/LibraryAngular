import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReaderComponent } from './reader.component';
import { ReaderRoutingModule } from './reader-routing.module';

@NgModule({
    imports: [CommonModule, SharedModule, ReaderRoutingModule],
    exports: [ReaderComponent],
    declarations: [ReaderComponent],
})
export class ReaderModule {}
