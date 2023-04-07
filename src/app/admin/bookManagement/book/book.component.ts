import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { bounceIn } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest, debounceTime, switchMap } from 'rxjs';
import { BookService } from 'src/app/core/services/books.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { BookFormComponent } from './form/bookForm.component';
import TinhTrangEnum, { bookItem } from 'src/app/enum/tinhtrang.enum';

@Component({
    templateUrl: 'book.component.html',
    selector: 'book-component',
    styleUrls: ['book.component.css'],
    animations: [
        trigger('bounce', [transition('* => *', useAnimation(bounceIn))]),
    ],
})
export class BookComponent implements OnInit {
    bounce: any;
    constructor(
        private toasrtService: ToastrService,
        private categoryService: CategoryService,
        private bookService: BookService,
        private dialogService: MatDialog
    ) {}
    ngOnInit(): void {
        const combined$ = combineLatest([this.searchTerm$, this.checkbox$]);
        combined$
            .pipe(
                debounceTime(300), // debounce the event to reduce frequency
                switchMap(([search, checkboxChange]) => {
                    const categoriesFilter = this.categoryOptions
                        .filter((e) => e.checked)
                        .map((e) => e.id)
                        .join(',');
                    return this.bookService.getAll({
                        name: search,
                        categoryIds: categoriesFilter,
                    });
                })
            )
            .subscribe({
                next: (data) => {
                    this.booksList = data.content;
                },
                error: (err) => {
                    this.toasrtService.error(err.message);
                },
            });
        this.categoryService.getAll().subscribe({
            next: (data) => {
                this.categoryOptions = data.map((e: any) => ({
                    ...e,
                    checked: false,
                }));
                console.log(data);
            },
        });
        this.loading = true;
        this.bookService.getAll().subscribe({
            next: (data) => {
                this.booksList = data.content;
                this.loading = false;
            },
            error: (err) => {
                this.toasrtService.error(err.message);
            },
        });
    }
    // Filter and options
    categoryOptions: any[] = [];
    selectedCategories: any[] = [];
    searchTerm$ = new BehaviorSubject('');
    checkbox$ = new BehaviorSubject(null);
    searchTerm = '';
    handleSearch(search: any) {
        this.searchTerm$.next(search);
    }
    handleCheck(option: any) {
        this.checkbox$.next(null);
    }

    // Books data
    loading = true;
    booksList: any[] = [];
    add() {
        const dialogRef = this.dialogService.open(BookFormComponent, {
            data: {
                id: 0,
                type: 'add',
            },
        });
        dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }
    selectCard(id: any, type: string) {
        const dialogRef = this.dialogService.open(BookFormComponent, {
            data: {
                id,
                type,
            },
        });
        if (type == 'update')
            dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }
}
