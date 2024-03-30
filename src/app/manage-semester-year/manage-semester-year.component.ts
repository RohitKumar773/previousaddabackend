import { Component,OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AddSemYearComponent } from '../add-sem-year/add-sem-year.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-semester-year',
  templateUrl: './manage-semester-year.component.html',
  styleUrls: ['./manage-semester-year.component.css']
})
export class ManageSemesterYearComponent implements OnInit{
  displayedColumns: string[] = ['university_semester_id','university_id_fk', 'univ_crse_id_fk', 'semester_name', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  semData:any
  deleteValue = 1;
  
  constructor(
    private dialog:MatDialog,
    private service:ServiceService
    ){}
    
    
    ngOnInit(): void {
      this.service.getSemester().subscribe(
        (semesterData:any) => {
          this.dataSource = new MatTableDataSource(semesterData.data);
          this.semData = semesterData.data.length
        }
      )
    }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  add_semester(){
    this.dialog.open(AddSemYearComponent,{
      disableClose:true
    })
  }

  deleteSemester(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deleteValue
    });
    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const deleteSemesterData = new FormData();
          deleteSemesterData.append('university_semester_id', row.university_semester_id),
          this.service.delSemester(deleteSemesterData).subscribe(
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