import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    Observable,
    ObservableInput,
    ReplaySubject,
    Subject,
    tap,
    throwError,
} from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import config from '../../config/config';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { ReaderService } from './reader.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseURL: string = config.ENDPOINT;
    private currentUserSubject = new BehaviorSubject<any>({} as any);
    private currentCustomerSubject = new BehaviorSubject<any>({});
    public currentCustomer = this.currentCustomerSubject
        .asObservable()
        .pipe(distinctUntilChanged());
    public currentUser = this.currentUserSubject
        .asObservable()
        .pipe(distinctUntilChanged());
    private currentLibrarianSubject = new BehaviorSubject<any>({} as any);
    public currentLibrarian = this.currentLibrarianSubject.asObservable();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    private isAdminSubject = new ReplaySubject<boolean>(1);
    public isAdmin = this.isAdminSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private router: Router,
        private readerService: ReaderService
    ) {}

    // Load user info with token in local storage (if any)
    // Run once on application startup
    populate() {
        const that = this;
        if (this.jwtService.getToken()) {
            this.currentUser$.subscribe({
                next(data) {
                    that.setAuth(data);
                    that.readerService.getOne(data.id).subscribe({
                        next: (reader) => {
                            that.currentCustomerSubject.next(reader);
                        },
                        error: (err) => {},
                    });
                },
                error(err) {
                    that.purgeAuth();
                    that.router.navigateByUrl('/login');
                },
            });
        } else {
            this.purgeAuth();
        }
    }

    setAuth(user: any) {
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        this.isAdminSubject.next(
            user.role === 'ADMIN' || user.role === 'SUPERADMIN'
        );
    }
    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as any);
        this.isAuthenticatedSubject.next(false);
        this.isAdminSubject.next(false);
    }
    attemptAuth(type: string, credentials: any): Observable<any> {
        const route = type === 'login' ? '/login' : '/register';
        return this.apiService.post('/auth' + route, credentials).pipe(
            tap(console.log),
            map((data) => {
                this.setAuth(data);
                return data;
            })
        );
    }

    currentUser$ = <Observable<any>>this.apiService.get(`/auth/identity`);
}
