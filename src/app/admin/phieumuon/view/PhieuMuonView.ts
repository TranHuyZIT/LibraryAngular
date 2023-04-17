import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { PhieuMuonService } from 'src/app/core/services/phieumuon.service';
import { ReaderService } from 'src/app/core/services/reader.service';

@Component({
    selector: 'phieumuon-view',
    templateUrl: 'PhieuMuonView.html',
    styleUrls: ['PhieuMuonView.css'],
})
export default class PhieuMuonViewComponent implements OnInit {
    constructor(
        private phieuMuonService: PhieuMuonService,
        private toastrService: ToastrService,
        private readerService: ReaderService,
        private route: Router
    ) {}
    ngOnInit(): void {
        this.readerIdControl = new FormControl('');
        this.search = new FormControl('');
        this.search.valueChanges.subscribe((text) => {
            this.readerService
                .getAll({
                    name: text,
                })
                .subscribe({
                    next: (data) => {
                        this.listReader = data.content;
                    },
                    error: (err) => {
                        this.toastrService.error(err.message);
                    },
                });
        });
        this.readerIdControl.valueChanges.subscribe((readerId) => {
            this.getPage(1);
        });
        this.getPage(1);
    }
    list: any[] = [];
    sortBy = 'id';
    reverse = false;
    loading = true;
    pageSize = 5;
    pageNo = 1;
    numberOfResults = 0;
    total = 0;
    search!: FormControl;
    readerIdControl!: FormControl;
    listReader: any[] = [];
    getPage(page: number) {
        this.loading = true;
        this.phieuMuonService
            .getAll({
                readerId: this.readerIdControl.value,
                pageNo: page,
                pageSize: this.pageSize,
                reverse: this.reverse,
                sortBy: this.sortBy,
            })
            .pipe(
                tap((res) => {
                    this.total = res.totalElements;
                    this.numberOfResults = res.numberOfElements;
                    this.pageNo = res.pageable.pageNumber + 1;
                    this.loading = false;
                })
            )
            .subscribe((response) => {
                this.list = response.content;
            });
    }
    serSortBy(sortBy: string) {
        if (this.sortBy === sortBy) this.reverse = !this.reverse;
        this.sortBy = sortBy;
        this.getPage(this.pageNo);
    }
    navigateToEdit(id: any) {
        this.route.navigateByUrl('/admin/phieumuon/detail/' + id);
    }
}
