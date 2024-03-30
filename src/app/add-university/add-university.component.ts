import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
// import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  admin = 1;
  universityFrom!: FormGroup;
  boxTitle: string = 'Add University'
  updateUniversity: string = 'Update University'
  actionButton: string = 'Save'

  constructor(
    private formBuilder: FormBuilder,
    private matref: MatDialogRef<AddUniversityComponent>,
    private service: ServiceService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.universityFrom = this.formBuilder.group({
      university_id: [''],
      university_name: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.editData) {
      this.actionButton = "Update";
      this.boxTitle = "Update University";
      this.updateUniversity = "Update University";
      this.universityFrom.controls['university_id'].setValue(Number(this.editData.university_id));
      this.universityFrom.controls['university_name'].setValue(this.editData.university_name);
      this.universityFrom.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }

  add_university() {
    if (!this.editData) {
      const formData = new FormData();
      formData.append('university_name', this.universityFrom.get('university_name')?.value);
      formData.append('admin_id_fk', this.universityFrom.get('admin_id_fk')?.value);
      console.log(this.universityFrom.value);
      this.service.universityPost(formData).subscribe(
        (result: any) => {
          this.route.navigate(['home/university']);
          console.log(result);
          this.matref.close();
          alert('Data Inserted Successfully')
        },
        (error: any) => {
          console.log(error)
          alert('Data Not Inserted')
        }
      )
    }
    else{
      this.universityUpdate()
    }
  }

  universityUpdate(){
    this.service.putUniversity(this.universityFrom.value).subscribe(
      (result:any) => {
        console.log(result)
        alert('Data Updated Successfully');
        this.route.navigate(['/home/university'])
        this.matref.close()
      },
      (error:any) => {
        console.log(error)
        alert('Data Not Updated')
      }
    )
  }



  reset() {
    this.universityFrom.reset();
  }

}
