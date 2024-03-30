import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-board-question',
  templateUrl: './add-board-question.component.html',
  styleUrls: ['./add-board-question.component.css']
})
export class AddBoardQuestionComponent implements OnInit {
  boardQuestionForm!: FormGroup;
  admin = 1;
  brdQuestionData: any
  classData: any

  constructor(
    private formbuilder: FormBuilder,
    private service: ServiceService,
    private matref: MatDialogRef<AddBoardQuestionComponent>
  ) { }

  ngOnInit(): void {
    this.service.getBoard().subscribe(
      (result: any) => {
        this.brdQuestionData = result.data
      }
    ),
      this.service.getBoardClass().subscribe(
        (res: any) => {
          this.classData = res.data
        }
      ),

      this.boardQuestionForm = this.formbuilder.group({
        b_previous_id: [''],
        b_prev_ques_name: ['', Validators.required],
        b_prev_ques_file: ['', Validators.required],
        board_id_fk: ['', Validators.required],
        board_cls_id_fk: ['', Validators.required],
        admin_id_fk: ['', Validators.required]
      })
  }

  addBoardQuestion() {
    const formdata = new FormData();
    formdata.append('b_prev_ques_name', this.boardQuestionForm.get('b_prev_ques_name')?.value);
    formdata.append('b_prev_ques_file', this.boardQuestionForm.get('b_prev_ques_file')?.value);
    formdata.append('board_id_fk', this.boardQuestionForm.get('board_id_fk')?.value);
    formdata.append('board_cls_id_fk', this.boardQuestionForm.get('board_cls_id_fk')?.value);
    formdata.append('admin_id_fk', this.boardQuestionForm.get('admin_id_fk')?.value);
    console.log(this.boardQuestionForm.value)
    this.service.postBoardQuestion(formdata).subscribe(
      (res: any) => {
        console.log(res)
        alert('Data inserted successfully')
        this.matref.close()
      },
      (error: any) => {
        console.log(error)
        alert('Data not insert')
      }
    )
  }

  getBoardClass(event: any) {
    const clssFormData = new FormData();
    clssFormData.append('board_id',event);

    this.service.getBoardClassFilter(clssFormData).subscribe(
      (res: any) => {
        console.log(res.data)
        this.classData = res.data
      }
    )
  }

  ImageUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.boardQuestionForm.get('b_prev_ques_file')?.setValue(file);
    }
  }

  reset() {
    this.boardQuestionForm.reset()
  }

}
