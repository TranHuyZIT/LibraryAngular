import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { headShake, wobble } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LibrarianService } from 'src/app/core/services/librarian.service';
import { PhieuMuonService } from 'src/app/core/services/phieumuon.service';
import { SelectComponent } from './select/select.component';
import TinhTrangEnum from 'src/app/enum/tinhtrang.enum';

@Component({
    selector: 'phieumuon-component',
    templateUrl: 'phieumuon.component.html',
    styleUrls: ['./phieumuon.component.css', '../../home/cart/cart.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class PhieuMuonComponent
 implements OnInit
{
    detailForm: FormGroup<{}>;
    headshake: any;
    currentLibrarian: any;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private phieumuonservice: PhieuMuonService,
        private authservice: AuthService,
        private librarianService: LibrarianService,
        private dialog: MatDialog,
    ) {
        this.form = this.fb.group({
            ngayMuon:  new FormControl('', Validators.required),
            note:  new FormControl('', Validators.required),
        });
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            ngayMuon: ['', Validators.required],
            note: [''],
        });
        this.detailForm = this.fb.group({});
        this.authservice.currentUser.subscribe({
            next: (user) => {
                this.librarianService.getOne(user.id).subscribe({
                   next: (data) => {
                        this.currentLibrarian = data;
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    }, 
                });
                this.curentuser = user;
            }

        });
        
    }

    itemsToRequest: any[] = [];

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

    form!: FormGroup;
    submitted = false;
    categoryOptions: any[] = [];
    tinhTrangEnum = TinhTrangEnum;
    get formControls() {
        return this.form.controls;
    }
    get formControlsDetail() {
        return this.detailForm.controls;
    }
    get formValues() {
        return this.form.value;
    }
    curentuser: any;
    save() {
        this.submitted = true;
        if (!this.form.valid || !this.detailForm.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
    }
}