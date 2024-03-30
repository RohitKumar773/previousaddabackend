import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-gov-exam',
  templateUrl: './add-gov-exam.component.html',
  styleUrls: ['./add-gov-exam.component.css']
})
export class AddGovExamComponent implements OnInit {
  govForm!: FormGroup
  admin = 1;


  constructor(
    private service:ServiceService,
    private formbuilder:FormBuilder,
    private matref:MatDialogRef<AddGovExamComponent>
  ){}

  ngOnInit(): void {
    this.govForm = this.formbuilder.group({
      gov_id:[''],
      gov_exam_name:['',Validators.required],
      admin_id_fk:['',Validators.required]
    })
  }

  addGovExam(){
    const formdata = new FormData();
    formdata.append('gov_exam_name',this.govForm.get('gov_exam_name')?.value);
    formdata.append('admin_id_fk',this.govForm.get('admin_id_fk')?.value);
    console.log(this.govForm.value);
    this.service.postGovernmentExam(formdata).subscribe(
      (result:any) => {
        this.matref.close();
        console.log(result);
        alert('data inserted successfully');
      },
      (error:any) => {
        console.log(error)
        alert('data not insert')
      }
    )
  }

  reset(){
    this.govForm.reset()
  }
}
