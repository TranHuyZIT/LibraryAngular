import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { headShake, wobble } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LibrarianService } from 'src/app/core/services/librarian.service';
import { PhieuTraService } from 'src/app/core/services/phieutra.service';


@Component({
    selector: 'phieutra',
    templateUrl: 'phieutra.component.html',
    styleUrls: ['phieutra.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class PhieuTraComponent implements OnInit{
    headShake: any;
    constructor(
        private toasrtService: ToastrService,
        private phieutraservice: PhieuTraService,
        private fb: FormBuilder,
        private authService: AuthService,
        private librarianService: LibrarianService,
    ) {}
    ngOnInit(): void {
        this.authService.currentUser.subscribe({
            next: (user) => {
                this.librarianService.getOne(user.id).subscribe({
                   next: (data) => {
                        this.librarianId = data.id
                    },
                    error: (err) => {
                        this.toasrtService.error(err.message);
                    }, 
                });
                this.curentuser = user;
            }
        });
    }
    
    form!: FormGroup;
    submitted = false;
    librarianId: any;
    curentuser: any;
    get formValues() {
        return this.form.value;
    }
    get formControls() {
        return this.form.controls;
    }
}
