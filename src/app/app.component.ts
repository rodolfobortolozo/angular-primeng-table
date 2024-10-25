import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { UserService } from '../shared/services/user.service';
import { Pagination } from '../shared/models/pagination.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  userPagination = {} as  Pagination<User>;
  totalRecords : number = 0;
  loading : boolean = true;
  rowsPerPage = [5, 10, 15, 20];
  
  constructor(private readonly userService: UserService){

  }


  loadUsersLazy(event: TableLazyLoadEvent){
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rowsPerPage[0];
    const page = (first / rows) + 1;

    this.loadDataUser(page, rows);
  }

  loadDataUser(page: number = 1, perPage: number = 5){
    this.loading = true;
    this.userService.getPaginate(page, perPage).subscribe({
      next: res => {
        this.userPagination = res;
        this.totalRecords = res.items;
      },
      error: err => console.log(err),
      complete: () => this.loading = false
    }
     
    )
  }
}
