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
import { PhieuMuonService } from 'src/app/core/services/phieumuon.service';

@Component({
    selector: 'phieumuon-component',
    templateUrl: 'phieumuon.component.html',
    styleUrls: ['./phieumuon.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class PhieuMuonComponent
 implements OnInit
{
    headshake: any;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private phieumuonservice: PhieuMuonService,
        private authservice: AuthService,
        private librarianService: LibrarianService,
    ) {
        this.form = this.fb.group({
            ngayMuon:  new FormControl('', Validators.required),
            note:  new FormControl('', Validators.required),
        });
    }
    ngOnInit(): void {
        this.phieumuonservice.getAll().subscribe({
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
                        this.librarianId = data.id;
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    }, 
                });
                this.curentuser = user;
            }
import { Component, OnInit } from '@angular/core';
import { PhieuMuonService } from 'src/app/core/services/phieumuon.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'phieumuon-component',
    templateUrl: 'phieumuon.component.html',
    styleUrls: ['phieumuon.component.css'],
})
export class PhieuMuonComponent implements OnInit {
    constructor(
        private phieumuonService: PhieuMuonService,
        private toasrtService: ToastrService
    ) {}

    ngOnInit(): void {
        this.phieumuonService.getAll().subscribe({
            next: (data) => {
                this.phieumuonList = data.content;
                console.log(data);
            },
            error: (err) => {
                this.toasrtService.error(err.message);
            },
        });
    }
    phieumuonList: any[] = [];
}

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
    librarianId: any;
}