import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from "environments/environment";
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  mem_images: any;
  mem_em_id: any;
  address: any;
  tel: any;
  mem_id_card: any;
  ListMember: string[]; // เก็บตัวแปรที่ดึงจากดาต้าเบส
  ListMemberOnTable: any[];
  okButtonOptions: any;
  TestUrlImg: any;
  popupVisible: any;
  currentEmployee: any;
  mem_firstname : any;
  constructor(public http: Http) {
  }

  ngOnInit() {
    this.ListMemberOnTable = [];
    this.http.get(environment.UrlLocalHost + "GetMember").subscribe(
      res => {
        this.ListMember = res.json();
        console.log(this.ListMember);
        this.ListMember.forEach((element, index) => {
          this.ListMemberOnTable[index] = {
            id: this.ListMember[index]['mem_id'],
            em_firstname: this.ListMember[index]['mem_firstname'],
            em_id: this.ListMember[index]['mem_em_id'],
            em_lastname: this.ListMember[index]['mem_lastname'],
            em_id_card: this.ListMember[index]['mem_id_card'],
            em_tel: this.ListMember[index]['mem_tel'],
            em_address: this.ListMember[index]['mem_address'],
            // em_images : this.ListMember[index]['mem_images'].replace(/\s/g, '')
          }
          this.TestUrlImg = this.ListMember[index]['mem_images'];
        });

      }
    );
  }

  onCellPrepared(e) {
    if (e.rowType === "data" && e.column.command === "edit") {
      var isEditing = e.row.isEditing,
        $links = e.cellElement.find(".dx-link");
      $links.text("");
      if (isEditing) {
        $links.filter(".dx-link-save").addClass("dx-icon-save");
        $links.filter(".dx-link-cancel").addClass("dx-icon-revert");
      } else {
        $links.filter(".dx-link-edit").addClass("dx-icon-edit");

        $links.filter(".dx-link-delete").addClass("dx-icon-trash");
      }
    }
  }
  Register(e) {
    var Id = e.data.em_id;
    var FistName = e.data.em_firstname;
    var LastName = e.data.em_lastname;
    var IdCard = e.data.em_id_card;
    var Tel = e.data.em_tel;
    var Address = e.data.em_address;
    this.http.get(environment.UrlLocalHost + "CreateMember/" + Id + "/" + FistName + "/" + LastName + "/" + IdCard + "/" + Tel + "/" + Address).subscribe(
      res => {
        console.log(res);
      });
  }
  DeleteMember(e) {
    var id = e.data.id;
    this.http.get(environment.UrlLocalHost + "DeleteMember/" + id).subscribe(
      res => {
        // console.log(res);
      }
    );
  }
  EditMember(e) {

    var Id = e.key.id;
    var EmId = e.key.em_id;
    var FistName = e.key.em_firstname;
    var LastName = e.key.em_lastname;
    var IdCard = e.key.em_id_card;
    var Tel = e.key.em_tel;
    var Address = e.key.em_address;
    this.http.get(environment.UrlLocalHost + "EditMember/" + Id + "/" + EmId + "/" + FistName + "/" + LastName + "/" + IdCard + "/" + Tel + "/" + Address).subscribe(
      res => {
        console.log(res);
      });
  }
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "Register",
        type: "success",
        icon: "add",
        onClick: (args: any) => {
          window.location.href = "https://localhost:8000/Register.html";
        }
      }
    }
    )
  }
  showInfo(id) {
    this.http.get(environment.UrlLocalHost + "ShowInfo/" + id).subscribe(
      res => {
          var result = res.json();
         console.log(result);
          this.mem_em_id = result[0]['mem_em_id'];
          this.mem_firstname = result[0]['mem_firstname'] + ' ' + result[0]['mem_lastname'];
          this.mem_id_card = result[0]['mem_id_card'];
          this.tel = result[0]['mem_tel'];
          this.address = result[0]['mem_address'];
          this.mem_images = result[0]['mem_images'];

      });



    this.currentEmployee = id;
    this.popupVisible = true;
  }
}
