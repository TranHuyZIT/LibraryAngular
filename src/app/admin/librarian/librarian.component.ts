import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { headShake, wobble } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LibrarianService } from 'src/app/core/services/librarian.service';

@Component({
    selector: 'librarian-component',
    templateUrl: 'librarian.component.html',
    styleUrls: ['./librarian.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class LibrarianComponent implements OnInit{
    headshake: any;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private librarianService: LibrarianService,
        private authservice: AuthService,
    ){  
        this.form = this.fb.group({
            name: new FormControl('', Validators.required),
            dob:  new FormControl('', Validators.required),
            contact:  new FormControl('', Validators.required),
        });
    }
    ngOnInit(): void {
        this.librarianService.getAll().subscribe({
            next: (data) => {
                this.categoryOptions = data;
            },
            error: (err) => {
                this.toastrService.error(err.message);
            },
        })
        this.authservice.currentUser.subscribe({
            next: (user) => {
                this.librarianService.getOne(user.id).subscribe({
                   next: (data) => {
                        this.form.setValue({
                            name: data.name,
                            dob: data.dob,
                            contact: data.contact,
                        });
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    }, 
                });
                this.curentuser = user;
            }

        });
    }
    submit() {
        this.submitted = true;
        if (!this.form.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        this.librarianService
                .update(this.curentuser.id, {
                    ...this.formValues,
                    user: this.curentuser.id
                })
                .subscribe({
                    next: (curentuser) => {
                        this.toastrService.success(
                            ' ' + curentuser.name + ' thành công'
                        );
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
    }
    form!: FormGroup;
    submitted = false;
    categoryOptions: any[] = [];
    get formControls() {
        return this.form.controls;
    }
    get formValues() {
        return this.form.value;
    }
    curentuser: any;
}
