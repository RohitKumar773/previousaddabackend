import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnInit {
  boardForm!: FormGroup;
  admin = 1;

  constructor(
    private service: ServiceService,
    private formbuilder: FormBuilder,
    private matref:MatDialogRef<AddBoardComponent>
  ) { }

  ngOnInit(): void {
    this.boardForm = this.formbuilder.group({
      board_id: [''],
      board_name: ['', Validators.required],
      admin_id_fk:['',Validators.required]
    })
  }

  add_board() {
    const formdata = new FormData();
    formdata.append('board_name',this.boardForm.get('board_name')?.value);
    formdata.append('admin_id_fk',this.boardForm.get('admin_id_fk')?.value);
    console.log(this.boardForm.value)
    this.service.postBoard(formdata).subscribe(
      (res:any) => {
        console.log(res);
        this.matref.close();
        alert('Data inserted successfully')
      },
      (error:any) => {
        console.log(error);
        alert('Data not insert')
      }
    )
   }

   reset(){
    this.boardForm.reset();
   }
}