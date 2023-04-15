import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from 'src/app/core/services/books.service';
import TinhTrangEnum from 'src/app/enum/tinhtrang.enum';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
    templateUrl: 'select.component.html',
    selector: 'select-component',
    styleUrls: ['select.component.css'],
})
export class SelectComponent implements OnInit {
    constructor(
        private bookService: BookService,
        private authService: AuthService,
        public dialogRef: MatDialogRef<SelectComponent>
    ) {}
    ngOnInit(): void {
        this.authService.currentCustomer.subscribe((reader) => {
            this.bookService
                .getAllByReaderId(reader.id)
                .subscribe((response) => {
                    this.options = response;
                });
        });
    }
    options: any[] = [];
    tinhTrangEnum = TinhTrangEnum;
    selectAndClose(bookItem: any) {
        this.dialogRef.close(bookItem);
    }
}
