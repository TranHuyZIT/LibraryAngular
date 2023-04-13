import { Component, OnInit } from "@angular/core";
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BookItemService } from "src/app/core/services/bookitem.service";


@Component({
    templateUrl: 'bookItem.component.html',
    styleUrls: ['bookItem.component.css'],
    selector: 'bookItem-component',
    animations: [
        trigger('bounce', [transition('* => *', useAnimation(bounceIn))]),
    ],
})
export class BookItemComponent implements OnInit{
    bouce: any;
    constructor(
        private oasrtService: ToastrService,
        private dialogService: MatDialog,
        private bookitemService: BookItemService
    ) {}
    ngOnInit(): void {

    }
}