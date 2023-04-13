// import { Component } from "@angular/core";
import { transition, trigger, useAnimation } from '@angular/animations';
import { headShake, wobble } from 'ng-animate';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';



@Component({
    selector: 'category-form',
    templateUrl: './categoryForm.component.html',
    styleUrls: ['./categoryForm.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class CategoryFormComponent implements OnInit {
    headshake: any;
    constructor(
        public dialogRef: MatDialogRef<CategoryFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private categoryService: CategoryService,
    ){
        this.form = this.fb.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        })
    }
    ngOnInit(): void {
        if (this.data.id){
            this.categoryService.getOne(this.data.id).subscribe({
                next: (data) => {
                    this.form.setValue({
                        name: data.name,
                        description: data.description
                    });
                },
                error:(err) => {
                    this.toastrService.error(err.message);
                },
            });
        }
    }
    form!: FormGroup;
    submitted = false;
    get formValues() {
        return this.form.value;
    }
    get formControls() {
        return this.form.controls;
    }
    submit(){
        this.submitted = true;
        if(!this.form.valid){
            this.toastrService.error('Vui lòng kiểm tra lại thông tin.');
            return;
        }
        if(this.data.type === 'add'){
            this.categoryService
                .add( {
                        ...this.formValues
                    })
                .subscribe({
                    next: (data) => {
                        this.toastrService.success(
                            'Thêm thể loại ' + data.name + ' thành công'
                        );
                        this.dialogRef.close();
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                })
                
        }else if (this.data.type === 'update') {
            this.categoryService
                .update(this.data.id, {
                    ...this.formValues
                })
                .subscribe({
                    next: (data) => {
                        this.toastrService.success(
                            'Cập nhật thể loại ' + data.name + ' thành công'
                        );
                        this.dialogRef.close();
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
        }
    }
}