import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { headShake } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import TinhTrangEnum, {
    convertTinhTrangValueToKey,
} from 'src/app/enum/tinhtrang.enum';

@Component({
    selector: 'cart-component',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css'],
    animations: [
        trigger('headshake', [transition('* => *', useAnimation(headShake))]),
    ],
})
export class CartComponent implements OnInit {
    headshake: any;
    constructor(
        private cartService: CartService,
        private fb: FormBuilder,
        private authService: AuthService,
        private toasrtService: ToastrService
    ) {}
    ngOnInit(): void {
        this.authService.currentCustomer.subscribe((reader) => {
            this.currentReader = reader;
            console.log(reader);
        });
        this.cart = this.cartService.getCart();
        this.numberOfBooks = this.cart.length;
        let cartControls = {};
        for (let item of this.cart) {
            cartControls[item.id] = [new Date(), Validators.required];
        }
        this.dates = this.fb.group(cartControls);
        this.form = this.fb.group({
            note: [''],
            ngayMuon: ['', Validators.required],
        });
    }
    currentReader: any;
    cart: any;
    numberOfBooks = 0;
    tinhTrangEnum = TinhTrangEnum;
    todayDate = new Date(new Date().getTime() - 3888000000);
    dates: FormGroup;
    form: FormGroup;
    submitted = false;
    get formControls() {
        return this.form.controls;
    }
    save() {
        this.submitted = true;
        if (!this.form.valid || this.numberOfBooks == 0) {
            this.toasrtService.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        const bodyRequest = {
            ...this.form.value,
        };
    }
}
