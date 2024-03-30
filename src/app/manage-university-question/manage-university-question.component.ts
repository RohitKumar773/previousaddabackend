import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddUniversityQuestionComponent } from '../add-university-question/add-university-question.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-university-question',
  templateUrl: './manage-university-question.component.html',
  styleUrls: ['./manage-university-question.component.css']
})
export class ManageUniversityQuestionComponent implements OnInit {

  displayedColumns: string[] = ['university_prev_id', 'university_id_fk', 'univ_crse_id_fk', 'univ_smstr_id_fk', 'u_prev_ques_name', 'u_prev_ques_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  qsData: any
  imageUrl: string = 'http://localhost/assets/'
  // imageUrl: string = 'https://previousadda.000webhostapp.com/assets/'
  deleteValue = 1;

  constructor(
    private dialog: MatDialog,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getUniversityQuestion().subscribe(
      (questionData: any) => {
        this.dataSource = new MatTableDataSource(questionData.data)
        this.qsData = questionData.data.length
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add_university_question() {
    this.dialog.open(AddUniversityQuestionComponent, {
      disableClose: true
    })
  }
  // delUniversityQuestion
  deleteUniversityQuestion(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deleteValue
    });

    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const deleteQuestion = new FormData();
          deleteQuestion.append('university_prev_id',row.university_prev_id),
          this.service.delUniversityQuestion(deleteQuestion).subscribe(
            (res:any) => {
              console.log(res);
              alert('Data deleted successfully')
            },
            (error:any) => {
              console.log(error)
              alert('data not delete')
            }
          )
        }
      }
    )
  }

}