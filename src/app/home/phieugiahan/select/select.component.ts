import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/books.service';

@Component({
    templateUrl: 'select.component.html',
    selector: 'select-component',
    styleUrls: ['select.component.css'],
})
export class SelectComponent implements OnInit {
    constructor(private bookService: BookService) {}
    ngOnInit(): void {}
    options: any[] = [];
}
