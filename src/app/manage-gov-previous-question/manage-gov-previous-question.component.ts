import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddGovPreviousQuestionComponent } from '../add-gov-previous-question/add-gov-previous-question.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-gov-previous-question',
  templateUrl: './manage-gov-previous-question.component.html',
  styleUrls: ['./manage-gov-previous-question.component.css']
})
export class ManageGovPreviousQuestionComponent implements OnInit {

  displayedColumns: string[] = ['g_previous_id','gov_id_fk', 'g_prev_ques_name', 'g_prev_ques_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  imageUrl: string = 'http://localhost/assets/'
  // imageUrl: string = 'https://previousadda.000webhostapp.com/assets/'
  govQuesData:any
  deleteValue = 1;

  constructor(
    private dialog: MatDialog,
    private service:ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getGovernmentQuestion().subscribe(
      (governmentQuestionData:any) => {
        this.dataSource = new MatTableDataSource(governmentQuestionData.data);
        this.govQuesData = governmentQuestionData.data.length

      }
    )
  }
  add_government_question() {
    this.dialog.open(AddGovPreviousQuestionComponent, {
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

  deleteGovQuestion(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent,{
      disableClose:true,
      data: this.deleteValue
    });
    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const delGovQuedata = new FormData();
          delGovQuedata.append('g_previous_id',row.g_previous_id),
          this.service.delGovernmentquestion(delGovQuedata).subscribe(
            (res:any) => {
              console.log(res)
              alert('Data deleted successfully')
            },
            (error:any) => {
              console.log(error)
              alert('data not deleted')
            }
          )
        }
      }
    )
  }

}