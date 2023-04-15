import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/core/services/books.service';
import TinhTrangEnum from 'src/app/enum/tinhtrang.enum';
import { SelectComponent } from './select/select.component';
import { ToastrService } from 'ngx-toastr';
import { transition, trigger, useAnimation } from '@angular/animations';
import { headShake } from 'ng-animate';

@Component({
    templateUrl: 'phieugiahan.component.html',
    styleUrls: ['phieugiahan.component.css', '../cart/cart.component.css'],
    selector: 'phieugiahan-component',
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class PhieuGiaHanComponent implements OnInit {
    detailForm: FormGroup<{}>;
    headshake: any;
    constructor(
        private fb: FormBuilder,
        private bookService: BookService,
        private dialog: MatDialog,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            ngayGHan: ['', Validators.required],
            note: [''],
        });
        this.detailForm = this.fb.group({});

    }
    itemsToRequest: any[] = [];
    numberOfBooks = 0;
    tinhTrangEnum = TinhTrangEnum;

    // detail
    openSelectionDialog() {
        const dialogRef = this.dialog.open(SelectComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;
            if (this.itemsToRequest.find((e) => e.id === result.id)) {
                this.toastrService.error('Quyển sách này đã được chọn');
                return;
            }
            this.itemsToRequest.push(result);
            this.rebuildDetailForm();
        });
    }

    rebuildDetailForm() {
        const group = {};
        for (let item of this.itemsToRequest) {
            group[item.id] = ['', Validators.required];
        }
        this.detailForm = this.fb.group(group);
    }

    // Form
    form: FormGroup;
    submitted = false;
    save() {
        this.submitted = true;
        if (!this.form.valid || !this.detailForm.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
    }
    get formControls() {
        return this.form.controls;
    }
    get formControlsDetail() {
        return this.detailForm.controls;
    }
}
