import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-board-class',
  templateUrl: './add-board-class.component.html',
  styleUrls: ['./add-board-class.component.css']
})
export class AddBoardClassComponent implements OnInit {
  BoardClassForm!: FormGroup
  classData: any
  admin = 1;

  constructor(
    private service: ServiceService,
    private formbuilder: FormBuilder,
    private matref: MatDialogRef<AddBoardClassComponent>
  ) { }

  ngOnInit(): void {
    this.service.getBoard().subscribe(
      (result: any) => {
        this.classData = result.data
      }
    ),

      this.BoardClassForm = this.formbuilder.group({
        b_class_id: [''],
        class_name: ['', Validators.required],
        board_id_fk: ['', Validators.required],
        admin_id_fk: ['', Validators.required]
      })
  }

  addBoardClass() {
    const formdata = new FormData();
    formdata.append('class_name', this.BoardClassForm.get('class_name')?.value);
    formdata.append('board_id_fk', this.BoardClassForm.get('board_id_fk')?.value);
    formdata.append('admin_id_fk',this.BoardClassForm.get('admin_id_fk')?.value);
    console.log(this.BoardClassForm.value);
    this.service.postBoardClass(formdata).subscribe(
      (res:any) => {
        alert('Data inserted Successfully');
        console.log(res);
        this.matref.close();
      },
      (error:any) => {
        alert('Data not insert');
        console.log(error)
      }
    )
  }

  reset(){
    this.BoardClassForm.reset();
  }
}