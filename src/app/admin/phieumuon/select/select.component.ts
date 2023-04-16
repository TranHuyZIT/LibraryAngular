import { Component, OnInit } from '@angular/core';
import TinhTrangEnum from 'src/app/enum/tinhtrang.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { BookItemService } from 'src/app/core/services/bookitem.service';
@Component({
    templateUrl: 'select.component.html',
    selector: 'select-component',
    styleUrls: ['select.component.css'],
})
export class SelectComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<SelectComponent>,
        private bookItemService: BookItemService,
    ) {}
    ngOnInit(): void {
        this.bookItemService.getAll().subscribe((response) => {
                console.log(response);
                this.options = response;
            });
    }
    options: any[] = [];
    tinhTrangEnum = TinhTrangEnum;
    selectAndClose(bookItem: any) {
        this.dialogRef.close(bookItem);
    }
}
