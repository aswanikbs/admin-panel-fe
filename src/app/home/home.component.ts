/**
 * Home component
 * Pending
 * Validations, Search, Filter, error handling, access control
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('employeeForm') employeeForm: any;
  employeeFormRef: BsModalRef;
  users: any;
  userForm: FormGroup;

  constructor(
    public homeservice: HomeService,
    private bsModalService: BsModalService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.createUserForm();
  }

  getUsers() {
    this.homeservice.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  createUserForm() {
    const fields = {
      firstName: [null, Validators.required],
      lastName: [null],
      email: [null, Validators.required],
      password: [null, [Validators.required]],
      role: ['Employee']
    };

    this.userForm = this.formBuilder.group(fields);
  }

  openEmployeeForm() {
    this.employeeFormRef = this.bsModalService.show(this.employeeForm, { class: 'alert-modal modal-sm' });
  }

  closeModal() {
    if(this.employeeFormRef){
      this.employeeFormRef.hide();
    }
  }

  saveUser() {
    this.homeservice.addUser(this.userForm.value).subscribe(res => {
      this.getUsers();
      this.closeModal();
    }, err => {
      // TODO: handle error
    });
  }

}
