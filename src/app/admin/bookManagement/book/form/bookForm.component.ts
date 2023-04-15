import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { headShake, wobble } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/core/services/books.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ImageService } from 'src/app/core/services/image.service';
import TinhTrangEnum, { bookItem } from 'src/app/enum/tinhtrang.enum';

@Component({
    selector: 'book-form',
    templateUrl: './bookForm.component.html',
    styleUrls: ['./bookForm.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class BookFormComponent implements OnInit {
    headshake: any;
    category: any;
    book: any;
    constructor(
        public dialogRef: MatDialogRef<BookFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private imageService: ImageService,
        private categoryService: CategoryService,
        private bookService: BookService,
        private cartService: CartService
    ) {
        this.form = this.fb.group({
            ten: new FormControl(
                { value: '', disabled: data.type === 'view' },
                Validators.required
            ),
            namXB: new FormControl(
                { value: '', disabled: data.type === 'view' },
                Validators.required
            ),
            tacGia: new FormControl(
                { value: '', disabled: data.type === 'view' },
                Validators.required
            ),
            image: new FormControl(
                { value: '', disabled: data.type === 'view' },
                Validators.required
            ),
            categoryId: new FormControl(
                { value: '', disabled: data.type === 'view' },
                Validators.required
            ),
            mota: new FormControl(
                { value: '', disabled: data.type === 'view' },
                Validators.required
            ),
        });
    }
    ngOnInit(): void {
        this.categoryService.getAll().subscribe({
            next: (data) => {
                this.categoryOptions = data;
            },
            error: (err) => {
                this.toastrService.error(err.message);
            },
        });
        if (this.data.id) {
            this.bookService.getOne(this.data.id).subscribe({
                next: (data) => {
                    this.book = data;
                    this.form.setValue({
                        ten: data.ten,
                        namXB: data.namXB,
                        tacGia: data.tacGia,
                        image: data.image,
                        categoryId: data.category.id,
                        mota: data.mota,
                    });
                    this.category = data.category;
                    this.bookItemsTable = data.listBookItem;
                    console.log(this.bookItemsTable);
                },
                error: (err) => {
                    this.toastrService.error(err.message);
                },
            });
        }
    }

    // form and data
    form!: FormGroup;
    submitted = false;
    categoryOptions: any[] = [];
    tinhTrangEnum = TinhTrangEnum;
    get formControls() {
        return this.form.controls;
    }
    get formValues() {
        return this.form.value;
    }
    async onChangeImage(event: any) {
        const isValid = await this.imageService.isImageUrl(
            this.formValues.image
        );
        if (!isValid) {
            this.toastrService.error('Vui lòng kiểm tra lại url hình ảnh');
            this.formControls['image']?.setErrors({ invalidUrl: true });
        }
    }
    submit() {
        this.submitted = true;
        if (!this.form.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        if (this.data.type === 'add') {
            this.bookService
                .add({
                    ...this.formValues,
                    listBookItem: this.bookItemsTable.map((e) => ({
                        trangThai: e.trangThai,
                        soLanMuon: e.soLanMuon,
                        tinhTrang: e.tinhTrang,
                    })),
                })
                .subscribe({
                    next: (data) => {
                        this.toastrService.success(
                            'Thêm sách ' + data.ten + ' thành công'
                        );
                        this.dialogRef.close();
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
        } else if (this.data.type === 'update') {
            this.bookService
                .update(this.data.id, {
                    ...this.formValues,
                    listBookItem: this.bookItemsTable.map((e) => ({
                        trangThai: e.trangThai,
                        soLanMuon: e.soLanMuon,
                        tinhTrang: e.tinhTrang,
                    })),
                })
                .subscribe({
                    next: (data) => {
                        this.toastrService.success(
                            'Thêm sách ' + data.ten + ' thành công'
                        );
                        this.dialogRef.close();
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
        }
    }

    // table book items
    bookItemsTable: any[] = [];
    borrowed = false;
    numberBorrowed = 0;
    status = 'VERY_GOOD';
    addBookItem() {
        console.log(this.numberBorrowed);

        this.bookItemsTable.push({
            trangThai: this.borrowed,
            soLanMuon: this.numberBorrowed,
            tinhTrang: this.status as keyof TinhTrangEnum,
        });
    }
    removeBookItem(index: number) {
        if (this.data.type === 'view') {
            this.toastrService.error('Không thể xóa khi đang xem');
            return;
        }
        this.bookItemsTable.splice(index, 1);
    }
    onCheck(borrowed: boolean) {
        this.borrowed = borrowed;
    }
    onSelectChange(value: any) {
        this.status = value;
    }
    onNumberBorrowChange(value: any) {
        this.numberBorrowed = value;
    }
    borrow(bookItem: any) {
        const currentCart = this.cartService.getCart();
        if (currentCart.find((e) => e.id == bookItem.id)) {
            this.toastrService.error(
                'Bạn đã chọn quyển sách này trong giỏ hàng rồi!'
            );
            return;
        }
        this.cartService.saveItem(bookItem, this.book);
        this.toastrService.success('Thêm vào giỏ hàng thành công');
    }
}
