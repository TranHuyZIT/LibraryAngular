import { Component } from '@angular/core';

@Component({
    selector: 'book-mgmt',
    templateUrl: 'bookManagement.component.html',
    styleUrls: ['bookManagement.component.css'],
})
export class BookMgmtComponent {
    constructor() {}

    // Tab handling
    activeTab = 'book';
    onTabSelect(id: string) {
        this.activeTab = id;
    }
}
