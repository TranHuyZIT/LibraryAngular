import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/core/services/books.service';
import TinhTrangEnum from 'src/app/enum/tinhtrang.enum';
import { SelectComponent } from './select/select.component';

@Component({
    templateUrl: 'phieugiahan.component.html',
    styleUrls: ['phieugiahan.component.css', '../cart/cart.component.css'],
    selector: 'phieugiahan-component',
})
export class PhieuGiaHanComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private bookService: BookService,
        private dialog: MatDialog
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            ngayGHan: ['', Validators.required],
            note: [''],
        });
        this.openSelectionDialog();
    }
    itemsToRequest: any[] = [];
    numberOfBooks = 0;
    tinhTrangEnum = TinhTrangEnum;

    // detail
    openSelectionDialog() {
        const dialogRef = this.dialog.open(SelectComponent);
    }

    // Form
    form: FormGroup;
    submitted = true;
    save() {}
    get formControls() {
        return this.form.controls;
    }
}
