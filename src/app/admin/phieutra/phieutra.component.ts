import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { headShake, wobble } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookItemService } from 'src/app/core/services/bookitem.service';
import { LibrarianService } from 'src/app/core/services/librarian.service';
import { PhieuTraService } from 'src/app/core/services/phieutra.service';
import { BehaviorSubject, combineLatest, debounceTime, switchMap } from 'rxjs';
import { ReaderService } from 'src/app/core/services/reader.service';

@Component({
    selector: 'phieutra',
    templateUrl: 'phieutra.component.html',
    styleUrls: ['phieutra.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class PhieuTraComponent implements OnInit {
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
                        this.listPhieuTra = data;
                        console.log(data);
                    },
                    error: (err) => {
                        this.toasrtService.error(err.message);
                    },
                });
        });
    }

    form!: FormGroup;
    submitted = false;
    librarianId: any;
    curentuser: any;
    listPhieuTra: any[] = [];
    get formValues() {
        return this.form.value;
    }
    get formControls() {
        return this.form.controls;
    }
}
