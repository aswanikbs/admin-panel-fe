import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.sharedService.logOutUser().subscribe(res => {
      localStorage.setItem('currentUser', null);
      this.router.navigate(['']);
    }, (err) => {
      //TODO: handle error
    });
  }
}
