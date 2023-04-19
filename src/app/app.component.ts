import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LogService } from './core/services/log.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private logService: LogService
    ) {}
    ngOnInit(): void {
        this.authService.populate();
    }
    title = 'library-client';
}
