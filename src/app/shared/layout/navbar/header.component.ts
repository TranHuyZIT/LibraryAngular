import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/core/services/log.service';

@Component({
    styleUrls: ['header.component.css'],
    templateUrl: 'header.component.html',
    selector: 'header-nav',
})
export class HeaderComponent implements OnInit {
    constructor(private logService: LogService) {}
    ngOnInit(): void {}
}
