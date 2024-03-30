import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-entrance-question',
  templateUrl: './add-entrance-question.component.html',
  styleUrls: ['./add-entrance-question.component.css']
})
export class AddEntranceQuestionComponent implements OnInit {
  EntranceQuestionForm!: FormGroup
  EntranceQuestionData: any
  admin = 1;


  constructor(
    private service: ServiceService,
    private formbuilder: FormBuilder,
    private matref: MatDialogRef<AddEntranceQuestionComponent>
  ) { }
  ngOnInit(): void {
    this.service.getEntrance().subscribe(
      (res: any) => {
        this.EntranceQuestionData = res.data
      }
    ),

      this.EntranceQuestionForm = this.formbuilder.group({
        e_previous_id:[''],
        e_prev_ques_name:['',Validators.required],
        e_prev_ques_file:['',Validators.required],
        entrance_id_fk:['',Validators.required],
        admin_id_fk:['',Validators.required]
      })
  }

  addEntranceQuestion(){
    const formdata = new FormData();
    formdata.append('e_prev_ques_name',this.EntranceQuestionForm.get('e_prev_ques_name')?.value);
    formdata.append('e_prev_ques_file',this.EntranceQuestionForm.get('e_prev_ques_file')?.value);
    formdata.append('entrance_id_fk',this.EntranceQuestionForm.get('entrance_id_fk')?.value);
    formdata.append('admin_id_fk',this.EntranceQuestionForm.get('admin_id_fk')?.value);
    console.log(this.EntranceQuestionForm.value);
    this.service.postEntranceQuestion(formdata).subscribe(
      (res:any) => {
        console.log(res);
        alert('Data Inserted Successfully');
        this.matref.close()
      },
      (error:any) => {
        console.log(error);
        alert(error)
      }
    )
  }


  onFileChanged(event:any){
    if(event.target.files){
      const file = event.target.files[0];
      this.EntranceQuestionForm.get('e_prev_ques_file')?.setValue(file);
    }
  }
}
