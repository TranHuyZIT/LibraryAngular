import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { headShake } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReaderService } from 'src/app/core/services/reader.service';
@Component({
    selector: 'reader-component',
    templateUrl: 'reader.component.html',
    styleUrls: ['./reader.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class ReaderComponent implements OnInit {
    currentUser_temp: any;
    headshake: any;

    constructor(
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private readerService: ReaderService,
        private authService: AuthService
    ) {
        this.form = this.formBuilder.group({
            address: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            birth: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.readerService;
        this.authService.currentUser.subscribe({
            next: (user) => {
                this.readerService.getOne(user.id).subscribe({
                    next: (data) => {
                        this.form.setValue({
                            birth: data?.birth || '',
                            address: data.address,
                            email: data.email,
                            name: data.name,
                            phone: data.phone,
                        });
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
                this.currentUser_temp = user;

                console.log('user- On Init', user);
                console.log('currrent User- On Init', this.currentUser_temp);
            },
        });
    }

    // FORM AND DATA
    form: FormGroup;
    submitted = false;
    get formControls() {
        return this.form.controls;
    }
    get formValues() {
        return this.form.value;
    }

    Submit() {
        this.submitted = true;
        this.readerService;
        // if (!this.form.valid) {
        //     this.toastrService.error('Vui lòng kiểm tra lại thông tin');
        //     return;
        // }
        console.log('Dữ liệu user được đổ vào dữ liệu reader', this.form.value);
        this.readerService
            .update(this.currentUser_temp.id, { ...this.formValues })
            .subscribe({
                next: (currentUser_temp) => {
                    this.toastrService.success('Cập nhật thành công');
                },
                error: (err) => {
                    this.toastrService.error(err.message);
                },
            });
        console.log('DONE');
    }

    // TABLE FOR BORROWED BOOK
}
