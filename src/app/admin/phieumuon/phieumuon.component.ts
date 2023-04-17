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
import { ReaderService } from 'src/app/core/services/reader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/services/books.service';

@Component({
    selector: 'phieumuon-component',
    templateUrl: 'phieumuon.component.html',
    styleUrls: [
        './phieumuon.component.css',
        '../../home/cart/cart.component.css',
    ],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class PhieuMuonComponent implements OnInit {
    detailForm: FormGroup<{}>;
    search: FormControl<string>;
    headshake: any;
    currentLibrarian: any;

    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private phieumuonservice: PhieuMuonService,
        private authservice: AuthService,
        private librarianService: LibrarianService,
        private dialog: MatDialog,
        private readerService: ReaderService,
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private bookService: BookService
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            ngayMuon: ['', Validators.required],
            note: [''],
            readerId: ['', Validators.required],
            isChecked: [true],
        });

        this.getSlug();

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
                this.currentuser = user;
            },
        });

        this.search = new FormControl('');
        this.search.valueChanges.subscribe((text) => {
            this.readerService
                .getAll({
                    name: text,
                })
                .subscribe({
                    next: (data) => {
                        this.listReader = data.content;
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
        });
    }

    itemsToRequest: any[] = [];
    listReader: any[] = [];
    getSlug() {
        this.activatedRouter.paramMap.subscribe((params) => {
            this.id = +(params.get('slug') || '0');
            this.bookService.getAll().subscribe((list) => {
                if (this.id) {
                    this.phieumuonservice
                        .getOne(this.id)
                        .subscribe((phieumuon) => {
                            this.form.setValue({
                                ngayMuon: phieumuon.ngayMuon,
                                note: phieumuon.note,
                                readerId: phieumuon.reader.id,
                                isChecked: phieumuon.checked,
                            });
                            this.currentReader = phieumuon.reader;
                            const group = {};
                            const chitiets = [];
                            for (let item of phieumuon.chitiets) {
                                const book = list.content.find(
                                    (e: any) => e.id === item.bookItem.bookId
                                );
                                group[item.bookItem.id] = [
                                    new Date(item.hanTra),
                                    Validators.required,
                                ];
                                chitiets.push({
                                    id: item.bookItem.id,
                                    soLanMuon: item.bookItem.soLanMuon,
                                    tinhTrang: item.bookItem.tinhTrang,
                                    trangThai: item.bookItem.trangThai,
                                    book,
                                });
                            }

                            this.itemsToRequest = [...chitiets];
                            this.detailForm = this.fb.group(group);
                        });
                }
            });
        });
    }

    openSelectionDialog() {
        const dialogRef = this.dialog.open(SelectComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;
            console.log(result);

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
    id: any;
    form!: FormGroup;
    submitted = false;
    categoryOptions: any[] = [];
    tinhTrangEnum = TinhTrangEnum;

    resetPage() {
        this.itemsToRequest = [];
        this.ngOnInit();
    }

    get formControls() {
        return this.form.controls;
    }
    get formControlsDetail() {
        return this.detailForm.controls;
    }
    get formValues() {
        return this.form.value;
    }
    currentuser: any;
    currentReader: any;
    check() {
        this.phieumuonservice.check(this.id).subscribe({
            next: (data) => {
                this.toastrService.success(
                    'Đã duyệt phiếu mượn, vui lòng giao sách cho độc giả'
                );
                this.router.navigateByUrl('/admin/phieumuon');
            },
            error: (err) => {
                this.toastrService.error(err.message);
            },
        });
    }
    save() {
        this.submitted = true;
        if (!this.form.valid || !this.detailForm.valid) {
            this.toastrService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        const bodyRequest = {
            ...this.form.value,
            librarianId: this.currentLibrarian.id,
            chitiets: this.itemsToRequest.map((item: any) => {
                return {
                    tinhTrang: item.tinhTrang,
                    hanTra: this.detailForm.value[item.id],
                    bookItemId: item.id,
                };
            }),
        };
        this.phieumuonservice.add(bodyRequest).subscribe({
            next: (data) => {
                this.toastrService.success('Gửi phiếu xin gia hạn thành công');
                this.resetPage();
            },
            error: (err) => {
                this.toastrService.error(err.message);
            },
        });
    }
}
