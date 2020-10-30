import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public bsModalRef: BsModalRef,
    private ngZone: NgZone,
    private toastrService: ToastrService) { }
  title: string;
  list: any[] = [];
  ngOnInit(): void {

    this.addForm = this.formBuilder.group({
      id: [],
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      last_name: ['', Validators.required],
    });
    if (this.list[0]) {
      this.userService.getUserById(this.list[0].data).subscribe((res: any) => {
        this.addForm.patchValue({
          id: res.data.id,
          first_name: res.data.first_name,
          email: res.data.email,
          last_name: res.data.last_name,
        });
      });
    }
  }
  onSubmit() {
    if (this.title === 'Add Form') {
      this.userService.createUser(this.addForm.value)
        .subscribe((data: any) => {

          this.addForm.updateValueAndValidity = data;
          this.toastrService.success('Added succesfully!');
          this.bsModalRef.content.onClose.next(true);
          console.log(this.addForm.value);

        });
    }
    else {
      this.userService.updateUser(this.list[0].data, this.addForm.value).subscribe((res: any) => {

        this.toastrService.success('Updated succesfully!');
        this.bsModalRef.content.onClose.next(true);
        // this.ngZone.run(() => this.router.navigateByUrl('/user'));


      });
    }
    this.router.navigate(['/user']);
    this.bsModalRef.hide();
  }
}

