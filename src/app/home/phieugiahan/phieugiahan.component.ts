import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/core/services/books.service';
import TinhTrangEnum from 'src/app/enum/tinhtrang.enum';

@Component({
    templateUrl: 'phieugiahan.component.html',
    styleUrls: ['phieugiahan.component.css', '../cart/cart.component.css'],
    selector: 'phieugiahan-component',
})
export class PhieuGiaHanComponent implements OnInit {
    constructor(private fb: FormBuilder, private bookService: BookService) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            ngayGHan: ['', Validators.required],
            note: [''],
        });
    }
    itemsToRequest: any[] = [];
    numberOfBooks = 0;
    tinhTrangEnum = TinhTrangEnum;

    // Form
    form: FormGroup;
    submitted = true;
    save() {}
    get formControls() {
        return this.form.controls;
    }
}
