import { Component,OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AddUniversityCourseComponent } from '../add-university-course/add-university-course.component';
import { ServiceService } from '../service.service';
import { MatSort } from '@angular/material/sort';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-university-course',
  templateUrl: './manage-university-course.component.html',
  styleUrls: ['./manage-university-course.component.css']
})
export class ManageUniversityCourseComponent implements OnInit{
  univCourseData:any;
  displayedColumns: string[] = ['university_course_id', 'university_course_name', 'university_id_fk', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  deleteValue = 1;

  constructor(
    private dialog:MatDialog,
    private service:ServiceService
  ){}

  ngOnInit(): void {
    this.service.getUniversityCourse().subscribe(
      (universityCourseData:any) => {
        this.dataSource = new MatTableDataSource(universityCourseData.data);
        this.univCourseData = universityCourseData.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  add_university_course(){
    this.dialog.open(AddUniversityCourseComponent,{
      disableClose:true
    })
  }

  courseUpdate(row:any){
    this.dialog.open(AddUniversityCourseComponent,{
      data:row
    })
  }

  delUnivCourse(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deleteValue
    });

    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const ucourseformdata = new FormData();
          ucourseformdata.append('university_course_id',row.university_course_id),
          this.service.deleteUniversityCourse(ucourseformdata).subscribe(
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