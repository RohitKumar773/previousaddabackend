import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-entrance-exam',
  templateUrl: './add-entrance-exam.component.html',
  styleUrls: ['./add-entrance-exam.component.css']
})
export class AddEntranceExamComponent implements OnInit{
  EntranceForm!:FormGroup;
  admin = 1;
  
  constructor(
    private service:ServiceService,
    private matref:MatDialogRef<AddEntranceExamComponent>,
    private formbuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.EntranceForm = this.formbuilder.group({
      entrance_id:[''],
      entrance_exam_name:['',Validators.required],
      admin_id_fk:['',Validators.required]
    })
  }

  addEntranceExam(){
    const formdata = new FormData();
    formdata.append('entrance_exam_name', this.EntranceForm.get('entrance_exam_name')?.value);
    formdata.append('admin_id_fk', this.EntranceForm.get('admin_id_fk')?.value);
    console.log(this.EntranceForm.value);
    this.service.postEntrance(formdata).subscribe(
      (res:any) => {
        console.log(res);
        alert('Data inserted successfully')
        this.matref.close();
      },
      (error:any) => {
        console.log(error)
        alert('Data Not Insert')
      }
    )
  }

  reset(){
    this.EntranceForm.reset()
  }
}
