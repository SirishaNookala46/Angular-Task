import { Component, OnInit, AfterViewInit, Renderer2, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewUserComponent } from '../new-user/new-user.component';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewUserComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;

  constructor(private userService: UserService,
    private renderer: Renderer2,
    private modalService: BsModalService,
    private toastrService: ToastrService
  ) { }
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.loadData();
  }
  loadData() {
 
    let removedArray = this.dtOptions.data;
    this.dtOptions = {
      paging: true,
      searching: true,
      ordering: true,
      responsive: true,
      destroy: true,
      processing: true,
      // columns definition
      columns: [
        {
          data: "id",
          title: "User ID"
        },
        {
          data: "first_name",
          title: "First Name"
        },
        {
          data: "last_name",
          title: "Last Name"
        },
        {
          data: "email",
          title: "Email"
        },
        {
          data: "id",
          title: "Actions",
          render: function (data: any, type: any, full: any, meta: any) {
            //   return 'View';
            return `<span><button id="Edit" >
                      <i class="fa fa-edit" view-data-id="${data}"></i></span>
                      <span><button id="Delete">
                      <i class = "fa fa-trash"  delete-data-id="${data}"></i></button></span>`;
          },
        }
      ],
    }
    this.userService.getUsers().subscribe((res: any) => {
     
      
      if (removedArray != undefined) {
        this.dtOptions.data = removedArray;
      }
      else {
        this.dtOptions.data = res.data;
      }


      this.rerender();
    });
  }
  onAdd(flag: String) {
    if (flag === 'add') {
      const initialState = {
        list: [],
        title: 'Add Form'
      };
      this.modalRef = this.modalService.show(NewUserComponent, { initialState });
    }
    else {
      const initialState = {
        list: [
          { 'data': flag }
        ],
        title: 'Edit Form'
      };
      this.modalRef = this.modalService.show(NewUserComponent, { initialState });
    }

    this.modalRef.content.onClose = new Subject<boolean>();
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);

      if (this.modalRef.content.addForm.value.id == null) {
        this.modalRef.content.addForm.updateValueAndValidity.id = parseInt(this.modalRef.content.addForm.updateValueAndValidity.id);
        this.dtOptions.data.push(this.modalRef.content.addForm.updateValueAndValidity);
      }
      else {
        for (var i = 0; i < this.dtOptions.data.length; i++) {
          if (this.modalRef.content.addForm.value.id == this.dtOptions.data[i].id) {
            this.dtOptions.data[i] = this.modalRef.content.addForm.value;
          }

        }
      }


      this.loadData();
    });
  }

  onDelete(id: number) {
    let dd = id;
    this.userService.deleteUser(id).subscribe((res) => {
      if (res == null) {
        this.toastrService.success('Deleted succesfully!');
        var ss = this.dtOptions.data;

        for (let i = 0; i < this.dtOptions.data.length; i++) {
          if (dd == this.dtOptions.data[i].id) {
            var data = this.dtOptions.data.splice(i, 1);
          }
        }

        console.log(dd);
        console.log("after", this.dtOptions.data);

        this.loadData();
      }
      else {
        this.toastrService.error('Error !!!');
      }
    });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (evt) => {
      if (evt.target.hasAttribute("view-data-id")) {
        this.onAdd(evt.target.getAttribute("view-data-id"));
      }
      if (evt.target.hasAttribute("delete-data-id")) {
        this.onDelete(evt.target.getAttribute("delete-data-id"));
      }
    });
    this.dtTrigger.next();

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

