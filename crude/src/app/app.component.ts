import { Component,OnInit } from '@angular/core';
import {CrudeService} from './services/crude.service';
import {map,tap} from 'rxjs/operators';
import { Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SAMSUNG';

  
  
  employee: any;
  employeeName!: string;
  employeeAge!: number;
  employeeAddress!: string;
  employeeMobile! :number;
  message: string | undefined;
  
      constructor(public crudeservice:CrudeService){

      }
      ngOnInit(){
        this.crudeservice.get_Allemployee().subscribe((data: any[])  =>{
          this.employee = data.map(e =>{
            return {
              id: e.payload.doc.id,
              isedit :false,
              name: e.payload.doc.data()['name'],
              age: e.payload.doc.data()['age'],
              mobile: e.payload.doc.data()['mobile'],
              address: e.payload.doc.data()['address']
            }
          })
          console.log(this.employee);
        })
      }

      CreateRecord(){
        let Record:any ={};
        Record['name'] = this.employeeName;
        Record['age'] = this.employeeAge;
        Record['mobile'] = this.employeeMobile;
        Record['address'] = this.employeeAddress;

        this.crudeservice.create_Newemployee(Record).then(res =>{
          this.employeeName = "";
          this.employeeAge = 0;
          this.employeeAddress= "";
          this.employeeMobile = 0;
          console.log(res);
          this.message = "Employee data Save Done"


        }).catch(error =>{
          console.log(error);
        })
      }

   EditRecord(Record: any){
     Record.isedit = true;
     Record.editname = Record.name;
     Record.editage = Record.age;
     Record.editmobile = Record.mobile;
     Record.editaddress = Record.address;
   }

   Updatarecord(recorddata:any)
  {
    let record:any ={};
    record['name'] = recorddata.editname;
    record['age'] = recorddata.editage;
    record['mobile'] = recorddata.editmobile;
    record['address'] = recorddata.editaddress;
    this.crudeservice.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }
  Deleteemployee(record_id: any)
  {
    this.crudeservice.delete_employee(record_id);
  }
}
