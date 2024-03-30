import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-university-course',
  templateUrl: './add-university-course.component.html',
  styleUrls: ['./add-university-course.component.css']
})
export class AddUniversityCourseComponent implements OnInit {
  universityCourseForm!: FormGroup;
  courseData: any
  admin = 1;
  boxTitle:string = 'Add Course'
  actionButton:string = 'Save'

  constructor(
    private service: ServiceService,
    private matref: MatDialogRef<AddUniversityCourseComponent>,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.service.getUniversity().subscribe(
      (res: any) => {
        this.courseData = res.data
      }
    ),

    this.universityCourseForm = this.formBuilder.group({
      university_course_id: [''],
      university_course_name: ['', Validators.required],
      university_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
  }

  add_course() {
    const formData = new FormData();
    formData.append('university_course_name', this.universityCourseForm.get('university_course_name')?.value);
    formData.append('university_id_fk', this.universityCourseForm.get('university_id_fk')?.value);
    formData.append('admin_id_fk',this.universityCourseForm.get('admin_id_fk')?.value);
    console.log(this.universityCourseForm.value);
    this.service.postUniversityCourse(formData).subscribe(
      (result:any) => {
        this.matref.close();
        alert('data inserted successfully');
        console.log(result)
      },
      (error:any) => {
        alert('data not insert');
        console.log(error)
      }
    )
  }

  reset_course() {
    this.universityCourseForm.reset()
  }
}
