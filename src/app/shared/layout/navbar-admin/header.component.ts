import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/core/services/log.service';

@Component({
    styleUrls: ['../navbar/header.component.css'],
    templateUrl: 'header.component.html',
    selector: 'header-admin-nav',
})
export class HeaderAdminComponent implements OnInit {
    constructor(private logService: LogService) {}
    ngOnInit(): void {}
    getMorePage() {
        this.loadingMessage = true;
        this.logService
            .getAll({ pageSize: this.pageSize, pageNo: this.pageNo })
            .subscribe((response) => {
                if (
                    response.numberOfElements < this.pageSize &&
                    this.pageNo > 1
                ) {
                    this.isLastPage = true;
                    return;
                }
                this.isLastPage = false;
                this.loadingMessage = false;
                this.messages = [...this.messages, ...response.content];
                this.pageNo += 1;
            });
    }
    getPage() {
        this.pageNo = 1;
        this.messages = [];
        this.getMorePage();
    }
    pageNo = 1;
    pageSize = 5;
    messages: any[] = [];
    loadingMessage = true;
    isLastPage: boolean = false;
}
