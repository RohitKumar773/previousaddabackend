import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEntranceExamComponent } from '../add-entrance-exam/add-entrance-exam.component';
import { AddEntranceQuestionComponent } from '../add-entrance-question/add-entrance-question.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-entrance-question',
  templateUrl: './manage-entrance-question.component.html',
  styleUrls: ['./manage-entrance-question.component.css']
})
export class ManageEntranceQuestionComponent implements OnInit {

  displayedColumns: string[] = ['e_previous_id', 'entrance_id_fk', 'e_prev_ques_name', 'e_prev_ques_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  imageUrl: string = 'http://localhost/assets/';
  // imageUrl: string = 'https://previousadda.000webhostapp.com/assets/'
  deleteValue = 1;

  constructor(
    private dialog: MatDialog,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getEntranceQuestion().subscribe(
      (EntranceQuestionData: any) => {
        this.dataSource = new MatTableDataSource(EntranceQuestionData.data)
      }
    )
  }
  add_entrance_question() {
    this.dialog.open(AddEntranceQuestionComponent, {
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

  delEntranceQuestion(row: any) {
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose: true,
      data: this.deleteValue
    });

    deleteDialog.afterClosed().subscribe(
      result => {
        if (this.deleteValue == result) {
          const delentrancequesdata = new FormData();
          delentrancequesdata.append('e_previous_id', row.e_previous_id);
          this.service.deleteEntranceQuestion(delentrancequesdata).subscribe(
            (res: any) => {
              console.log(result)
              
              alert('Data delete successfully')
            },
            (error: any) => {
              console.log(error)
              alert('Data deleted successfully')
            }
          )
        }
      }
    )
  }

}