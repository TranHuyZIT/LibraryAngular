import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/core/services/books.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';
import { BehaviorSubject, combineLatest, debounceTime, switchMap } from 'rxjs';
import { BookComponent } from '../book/book.component';
import { BookFormComponent } from '../book/form/bookForm.component';
import { CategoryFormComponent } from './categoryForm/categoryForm.component';

@Component({
    templateUrl: 'category.component.html',
    styleUrls: ['category.css'],
    selector: 'category-component',
    animations: [
        trigger('bounce', [transition('* => *', useAnimation(bounceIn))]),
    ],
})
export class CategoryComponent implements OnInit {
    bounce: any;
    constructor(
        private toasrtService: ToastrService,
        private categoryService: CategoryService,
        // private bookForm: BookFormComponent,
        // private bookService: BookService,
        private dialogService: MatDialog,
    ) {}
    ngOnInit(): void {
        this.categoryService.getAll().subscribe({
            next: (data) => {
                this.categoryList = data;
                console.log(data);
            },
            error: (err) => {
                this.toasrtService.error(err.message);
            },
        });
    }

    add() {
        const dialogRef = this.dialogService.open(CategoryFormComponent, {
            data: {
                id: 0,
                type: 'add',
            },
        });
        dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }
    selectCard(id: any, type: string) {
        const dialogRef = this.dialogService.open(CategoryFormComponent, {
            data: {
                id,
                type,
            },
        });
        if (type == 'update')
            dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }
    searchTerm$ = new BehaviorSubject('');
    checkbox$ = new BehaviorSubject(null);
    searchTerm = '';
    loading = true;
    categoryList: any[] = [];
}
