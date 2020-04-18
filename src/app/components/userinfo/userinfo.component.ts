import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SortOrder } from 'src/app/enums/sortOrder.enum';
import { UserType } from 'src/app/models/user.model';
import { faSort, faSortDown, faSortUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  users: Array<UserType>;
  sortOrder: SortOrder;
  sortKey: string;
  sortIcon: IconDefinition;
  tableHeaders: Array<string>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.sortIcon = this.getSortIcon(this.sortOrder);
  }

  getUsers (): void {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        if (Array.isArray(this.users) && this.users.length) {
          this.tableHeaders = Object.keys(this.users[0]);
        }
      });
  }

  sort (key: string): void {
    if (key !== this.sortKey) {
      this.sortKey = key;
      this.sortOrder = SortOrder.ASC;
    } else {
      this.sortOrder = ++this.sortOrder%3;
    }
    this.sortIcon = this.getSortIcon(this.sortOrder);
  }

  getSortIcon (sortOrder: SortOrder): IconDefinition {
    let sortIcon: IconDefinition;

    switch (sortOrder) {
      case SortOrder.ASC:
        sortIcon = faSortUp;
        break;
      case SortOrder.DESC:
        sortIcon = faSortDown;
        break;
      default:
        sortIcon = faSort;
    }

    return sortIcon;
  }
}
