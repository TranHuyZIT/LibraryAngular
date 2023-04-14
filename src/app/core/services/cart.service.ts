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

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private currentCartSubject = new BehaviorSubject<any>([]);
    public currentCart = this.currentCartSubject.asObservable();

    constructor(private router: Router) {}

    getCart(): any[] {
        return window.localStorage['cart'] &&
            JSON.parse(window.localStorage['cart'])?.length > 0
            ? JSON.parse(window.localStorage['cart'])
            : [];
    }

    saveItem(bookItem: any, book: any) {
        const currentCart = [...this.getCart()];
        currentCart.push({
            ...bookItem,
            book,
        });
        window.localStorage['cart'] = JSON.stringify(currentCart);
        this.currentCartSubject.next(currentCart);
    }

    destroyItem(index: any) {
        const currentCart = [...this.getCart()];
        const newCart = currentCart.splice(index, 1);
        window.localStorage['cart'] = JSON.stringify(newCart);
        this.currentCartSubject.next(newCart);
    }
}
