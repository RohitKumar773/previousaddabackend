import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-university-question',
  templateUrl: './add-university-question.component.html',
  styleUrls: ['./add-university-question.component.css']
})
export class AddUniversityQuestionComponent implements OnInit {
  universityQuestionForm!: FormGroup
  admin = 1;
  universityData: any
  courseData: any
  semesterData:any

  constructor(
    private service: ServiceService,
    private matref: MatDialogRef<AddUniversityQuestionComponent>,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.service.getUniversity().subscribe(
      (res: any) => {
        this.universityData = res.data
      }
    ),
      this.service.getUniversityCourse().subscribe(
        (res: any) => {
          this.courseData = res.data
        }
      ),
      this.service.getSemester().subscribe(
        (res:any) => {
          this.semesterData = res.data
        }
      ),

      this.universityQuestionForm = this.formbuilder.group({
        university_prev_id:[''],
        u_prev_ques_name:['',Validators.required],
        u_prev_ques_file:['',Validators.required],
        university_id_fk:['',Validators.required],
        univ_crse_id_fk:['',Validators.required],
        univ_smstr_id_fk:['',Validators.required],
        admin_id_fk:['',Validators.required]
      })
  }

  addQuestion(){
    const formdata = new FormData();
    formdata.append('u_prev_ques_name',this.universityQuestionForm.get('u_prev_ques_name')?.value);
    formdata.append('u_prev_ques_file',this.universityQuestionForm.get('u_prev_ques_file')?.value);
    formdata.append('university_id_fk',this.universityQuestionForm.get('university_id_fk')?.value);
    formdata.append('univ_crse_id_fk',this.universityQuestionForm.get('univ_crse_id_fk')?.value);
    formdata.append('univ_smstr_id_fk',this.universityQuestionForm.get('univ_smstr_id_fk')?.value);
    formdata.append('admin_id_fk',this.universityQuestionForm.get('admin_id_fk')?.value);
    console.log(this.universityQuestionForm.value);
    this.service.postUniversityQuestion(formdata).subscribe(
      (result:any) => {
        console.log(result)
        alert('Data Inserted Successfully');
        this.matref.close();
      },
      (error:any) => {
        console.log(error)
        alert('Data Not Insset')
      }
    )
  }

  getUniversityCourse(event: any) {
    const courseFormData = new FormData();
    courseFormData.append('university_id', event)
    this.service.getUniversityCourseFilter(courseFormData).subscribe(
      (res: any) => {
        console.log(res.data)
        this.courseData = res.data
      }
    )
  }

  getUniversitySemester(event: any) { 
    const questionFormData = new FormData();
    questionFormData.append('university_course_id',event)
    this.service.getSemesterFilter(questionFormData).subscribe(
      (res:any) => {
        console.log(res.data)
        this.semesterData = res.data
      }
    )
  }


  ImageUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.universityQuestionForm.get('u_prev_ques_file')?.setValue(file);
      console.log(file)
    }
  }

  reset(){
    this.universityQuestionForm.reset();
  }

}
