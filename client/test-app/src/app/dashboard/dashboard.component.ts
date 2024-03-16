import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { Users } from "../models/users";
import { State } from "../models/states";
import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "../add-user/add-user.component";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    
    users: Users[] = [];
    backUpUsers: Users[] = [];
    filter: string = 'Off'
    addUser: boolean = false;
    newUser: Users = new Users();
    states = State.States;
    isFilterApplied : boolean = false;

    constructor(
        private userService: UsersService,
        private dialog: MatDialog,
        private toasterService: ToastrService) {}
    
    async ngOnInit() {
        let usrs = await this.userService.GetUsers();
        if (usrs != null && usrs?.length > 0) {
            this.users = usrs;
            this.users = this.users?.sort((a, b) => (a?.age > b?.age ? -1 : 1));
            this.users.map(x => x.state = this.states?.find(f => f.abbreviation == x.state)?.name ?? '');
            this.backUpUsers = JSON.parse(JSON.stringify(this.users));
        }
    }

    ApplyFilter() {
        if (this.filter == 'Off') {
            this.users = this.users.filter( x => x.age > 30);
            this.filter = 'On'
            this.isFilterApplied = true
        } else {
            this.users = this.backUpUsers;
            this.filter = 'Off';
            this.isFilterApplied = false;
        }
    }

    AddUser() {
        this.addUser = true;
        this.newUser = new Users();
    }

    Save() {
        this.users.splice(0, 0, this.newUser);
        this.backUpUsers = JSON.parse(JSON.stringify(this.users));
        this.addUser = false;
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AddUserComponent, {
          data: {},
        });
        dialogRef.afterClosed().subscribe(result => {
            this.newUser = result?.data;
            this.users.splice(0, 0, this.newUser);
            this.backUpUsers = JSON.parse(JSON.stringify(this.users));
            this.toasterService.success("User added successfully");
          });
      }
}