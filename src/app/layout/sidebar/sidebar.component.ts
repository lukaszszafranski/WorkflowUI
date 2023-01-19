import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  public role: string;

  constructor() { }

  ngOnInit(): void {
    this.role = (JSON.parse(localStorage.getItem("currentUser"))as unknown as User).role.toString()
  }

}
