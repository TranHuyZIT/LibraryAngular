import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { headShake } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookItemService } from 'src/app/core/services/bookitem.service';
import { LibrarianService } from 'src/app/core/services/librarian.service';
import { PhieuTraService } from 'src/app/core/services/phieutra.service';
import { BehaviorSubject, combineLatest, debounceTime, switchMap } from 'rxjs';
import { ReaderService } from 'src/app/core/services/reader.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectComponent } from './select/select.component';
import TinhTrangEnum from 'src/app/enum/tinhtrang.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'phieutra',
    templateUrl: 'phieutra.component.html',
    styleUrls: ['phieutra.component.css', '../../home/cart/cart.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class PhieuTraComponent implements OnInit {
    detailForm: FormGroup<{}>;
    headShake: any;
    search: FormControl<string>;
    dialogRef: any;
    currentLibrarian: any;
    constructor(
        private toasrtService: ToastrService,
        private phieutraservice: PhieuTraService,
        private fb: FormBuilder,
        private authService: AuthService,
        private librarianService: LibrarianService,
        private bookItemService: BookItemService,
        private readerService: ReaderService,
        private dialog: MatDialog
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            ngayTra: ['', Validators.required],
            note: [''],
            readerId: ['', Validators.required],
            isChecked: [true],
        });
        this.detailForm = this.fb.group({});
        this.authService.currentUser.subscribe({
            next: (user) => {
                this.librarianService.getOne(user.id).subscribe({
                    next: (data) => {
                        this.currentLibrarian = data;
                    },
                    error: (err) => {
                        this.toasrtService.error(err.message);
                    },
                });
                this.currentuser = user;
            },
        });
        this.search = new FormControl('');
        this.search.valueChanges.subscribe((text) => {
            console.log(text);
            this.readerService
                .getAll({
                    name: text,
                })
                .subscribe({
                    next: (data) => {
                        console.log(data.content);

                        this.listReader = data.content;
                        console.log(data);
                    },
                    error: (err) => {
                        this.toasrtService.error(err.message);
                    },
                });
        });
        this.authService.currentCustomer.subscribe((reader) => {
            this.currentReader = reader;
        });
        // detail
    }
    openSelectionDialog() {
        const dialogRef = this.dialog.open(SelectComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;
            if (this.itemsToRequest.find((e) => e.id === result.id)) {
                this.toasrtService.error('Quyển sách này đã được chọn');
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

    form!: FormGroup;
    submitted = false;
    librarianId: any;
    curentuser: any;
    listReader: any[] = [];
    itemsToRequest: any[] = [];
    tinhTrangEnum = TinhTrangEnum;
    currentuser: any;
    currentReader: any;

    get formValues() {
        return this.form.value;
    }
    get formControls() {
        return this.form.controls;
    }
    get formControlsDetail() {
        return this.detailForm.controls;
    }
    save() {
        this.submitted = true;
        if (!this.form.valid || !this.detailForm.valid) {
            this.toasrtService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        const bodyRequest = {
            ...this.formValues,
                librarianId: this.currentLibrarian.id,
                chitiets: this.itemsToRequest.map((e: any) => {
                    return {
                        tinhTrang: e.tinhTrang,
                        bookItemId: e.id,
                    };
                }),
        }
        this.phieutraservice.save(bodyRequest).subscribe({
            next: (data) => {
                    this.toasrtService.success('Gửi phiếu trả thành công');
                    this.resetPage();
                },
            error: (err) => {
                    this.toasrtService.error(err.message);
                },    
        })
            
            // .subscribe({
            //     
            //     
            // });
    }
    resetPage() {
        this.itemsToRequest = [];
        this.ngOnInit();
    }
}
