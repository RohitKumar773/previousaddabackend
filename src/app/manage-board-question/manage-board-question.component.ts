import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddBoardQuestionComponent } from '../add-board-question/add-board-question.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';
@Component({
  selector: 'app-manage-board-question',
  templateUrl: './manage-board-question.component.html',
  styleUrls: ['./manage-board-question.component.css']
})
export class ManageBoardQuestionComponent implements OnInit {

  displayedColumns: string[] = ['b_previous_id', 'board_id_fk', 'board_cls_id_fk', 'b_prev_ques_name', 'b_prev_ques_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  bordQusData: any
  imageUrl: string = 'http://localhost/assets/';
  // imageUrl: string = 'https://previousadda.000webhostapp.com/assets/'
  deleteValue = 1;

  constructor(
    private dialog: MatDialog,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getBoardQuestion().subscribe(
      (bordQuestionData: any) => {
        this.dataSource = new MatTableDataSource(bordQuestionData.data)
        this.bordQusData = bordQuestionData.data.length
      }
    )
  }

  add_board_question() {
    this.dialog.open(AddBoardQuestionComponent, {
      disableClose: true
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delBoardQues(row: any) {
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose: true,
      data: this.deleteValue
    });

    deleteDialog.afterClosed().subscribe(
      result => {
        if (this.deleteValue == result) {
          const deleteBoardquestiondata = new FormData();
          deleteBoardquestiondata.append('b_previous_id', row.b_previous_id),
            this.service.deleteBoardQuestion(deleteBoardquestiondata).subscribe(
              (res: any) => {
                console.log(res)
                alert('Data deleted successfully');
              },
              (error:any) => {
                console.log(error)
                alert('Data not deleted');
              }
            )
        }
      }
    )
  }
}