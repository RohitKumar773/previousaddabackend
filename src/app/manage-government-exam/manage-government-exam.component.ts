import { Component,OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AddGovExamComponent } from '../add-gov-exam/add-gov-exam.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-government-exam',
  templateUrl: './manage-government-exam.component.html',
  styleUrls: ['./manage-government-exam.component.css']
})
export class ManageGovernmentExamComponent implements OnInit{
  displayedColumns: string[] = ['gov_id', 'gov_exam_name', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  govData:any;
  deleteValue = 1;

  constructor(
    private dialog:MatDialog,
    private service:ServiceService
  ){}

  ngOnInit(): void {
    this.service.getGovernmentExam().subscribe(
      (governmentData:any) => {
        this.dataSource = new MatTableDataSource(governmentData.data);
        this.govData = governmentData.data.length
      }
    )
  }


  add_government_exam(){
    this.dialog.open(AddGovExamComponent,{
      disableClose:true
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  delGovExam(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deleteValue
    });
    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const govformdata = new FormData();
          govformdata.append('gov_id',row.gov_id),
          this.service.delGovernmentExam(govformdata).subscribe(
            (res:any) => {
              console.log(res)
              alert('data deleted successfully')
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