import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEntranceExamComponent } from '../add-entrance-exam/add-entrance-exam.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-entrance-exam',
  templateUrl: './manage-entrance-exam.component.html',
  styleUrls: ['./manage-entrance-exam.component.css']
})
export class ManageEntranceExamComponent implements OnInit {

  displayedColumns: string[] = ['entrance_id', 'entrance_exam_name', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  deleteValue = 1;

  entData:any

  constructor(
    private dialog: MatDialog,
    private service:ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getEntrance().subscribe(
      (entranceData:any) => {
        this.dataSource = new MatTableDataSource(entranceData.data)
        this.entData = entranceData.data.length
      }
    )
  }
  add_entrance_exam() {
    this.dialog.open(AddEntranceExamComponent, {
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

  delEntranceExam(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data:this.deleteValue
    });
    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const delEntrancedata = new FormData();
          delEntrancedata.append('entrance_id',row.entrance_id),
          this.service.deleteEntranceExam(delEntrancedata).subscribe(
            (res:any) => {
              console.log(res)
              alert('Data deleted successfully')
          },
          (error:any) => {
            console.log(error)
            alert('Data not deleted')
          }
          )
        }
      }
    )
  }

}