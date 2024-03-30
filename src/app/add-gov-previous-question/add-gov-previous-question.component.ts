import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-gov-previous-question',
  templateUrl: './add-gov-previous-question.component.html',
  styleUrls: ['./add-gov-previous-question.component.css']
})
export class AddGovPreviousQuestionComponent implements OnInit{
  govQuesForm!:FormGroup
  QuestionData:any
  admin = 1;

  constructor(
    private apiservice:ServiceService,
    private formbuilder:FormBuilder,
    private matref:MatDialogRef<AddGovPreviousQuestionComponent>
    ){}
  
  ngOnInit(): void {
    this.apiservice.getGovernmentExam().subscribe(
      (res:any) => {
        this.QuestionData = res.data
      }
    ),
    this.govQuesForm = this.formbuilder.group({
      g_previous_id:[''],
      g_prev_ques_name:['',Validators.required],
      g_prev_ques_file:['',Validators.required],
      gov_id_fk:['',Validators.required],
      admin_id_fk:['',Validators.required]
    })
  }

  add_btn(){
    const formdata = new FormData();
    formdata.append('g_prev_ques_name',this.govQuesForm.get('g_prev_ques_name')?.value);
    formdata.append('g_prev_ques_file',this.govQuesForm.get('g_prev_ques_file')?.value);
    formdata.append('gov_id_fk',this.govQuesForm.get('gov_id_fk')?.value);
    formdata.append('admin_id_fk',this.govQuesForm.get('admin_id_fk')?.value);
    console.log(this.govQuesForm.value);
    this.apiservice.postGovernmentQuestion(formdata).subscribe(
      (res:any) => {
        this.matref.close();
        alert('Data inserted successfully');
        console.log(res)
      },
      (error:any) => {
        alert('Data not insert')
        console.log(error)
      }
    )
  }

  onFileChanged(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.govQuesForm.get('g_prev_ques_file')?.setValue(file);
    }
  }
}
