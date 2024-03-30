import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sem-year',
  templateUrl: './add-sem-year.component.html',
  styleUrls: ['./add-sem-year.component.css']
})
export class AddSemYearComponent implements OnInit {
  semesterForm!: FormGroup
  admin = 1;
  universityData: any
  courseData: any

  constructor(
    private service: ServiceService,
    private matref: MatDialogRef<AddSemYearComponent>,
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

      this.semesterForm = this.formbuilder.group({
        university_semester_id: [''],
        semester_name: ['', Validators.required],
        university_id_fk: ['', Validators.required],
        univ_crse_id_fk: ['', Validators.required],
        admin_id_fk: ['', Validators.required]
      })
  }

  addSemester(){
    const formdata = new FormData();
    formdata.append('semester_name', this.semesterForm.get('semester_name')?.value);
    formdata.append('university_id_fk',this.semesterForm.get('university_id_fk')?.value);
    formdata.append('univ_crse_id_fk',this.semesterForm.get('univ_crse_id_fk')?.value);
    formdata.append('admin_id_fk',this.semesterForm.get('admin_id_fk')?.value);
    console.log(this.semesterForm.value);
    this.service.postSemester(formdata).subscribe(
      (res:any) => {
        console.log(res)
        alert('Data Inserted Successfully')
        this.matref.close();
      },
      (error:any) => {
        console.log(error);
        alert('Data not insert');
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

}