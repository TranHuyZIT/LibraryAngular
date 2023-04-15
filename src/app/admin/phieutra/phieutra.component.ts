import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { headShake} from 'ng-animate';
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
    constructor(
        private toasrtService: ToastrService,
        private phieutraservice: PhieuTraService,
        private fb: FormBuilder,
        private authService: AuthService,
        private librarianService: LibrarianService,
        private bookItemService: BookItemService,
        private readerService: ReaderService,
        private dialog: MatDialog,
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            ngayTra: ['', Validators.required],
            note: [''],
            readerID: ['', Validators.required],
            isChecked: [true],
        });
        this.authService.currentUser.subscribe({
            next: (user) => {
                this.librarianService.getOne(user.id).subscribe({
                    next: (data) => {
                        this.librarianId = data.name;
                    },
                    error: (err) => {
                        this.toasrtService.error(err.message);
                    },
                });
                this.curentuser = user;
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

                        this.listPhieuTra = data.content;
                        console.log(data);
                    },
                    error: (err) => {
                        this.toasrtService.error(err.message);
                    },
                });
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
    listPhieuTra: any[] = [];
    itemsToRequest: any[] = [];
    tinhTrangEnum = TinhTrangEnum;

    get formValues() {
        return this.form.value;
    }
    get formControls() {
        return this.form.controls;
    }
    get formControlsDetail() {
        return this.detailForm.controls;
    }
}
