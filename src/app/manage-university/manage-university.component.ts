import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUniversityComponent } from '../add-university/add-university.component';
import { ServiceService } from '../service.service';
import { MatSort } from '@angular/material/sort';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-university',
  templateUrl: './manage-university.component.html',
  styleUrls: ['./manage-university.component.css']
})
export class ManageUniversityComponent implements OnInit {
  displayedColumns: string[] = ['university_id', 'university_name', 'Action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  univData: any
  deletevalue = 1;

  constructor(
    private dialog: MatDialog,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getUniversity().subscribe(
      (universitydata: any) => {
        this.dataSource = new MatTableDataSource(universitydata.data);
        this.univData = universitydata.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  openUniversityForm() {
    this.dialog.open(AddUniversityComponent, {
      disableClose: true
    })
  }

  update_university(row:any){
    this.dialog.open(AddUniversityComponent,{
      data:row,
      disableClose:true
    })
  }

  delete_university(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deletevalue
    });

    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deletevalue == result){
          const deleteUniversityData = new FormData();
          deleteUniversityData.append('university_id',row.university_id),
          this.service.deleteUniversity(deleteUniversityData).subscribe(
            (res:any) => {
              console.log(res)
              alert('Data deleted successfully')
            },
            (error:any) => {
              console.log(error)
              alert('Data not delete')
            }
          )
        }
      }
    )
  }

}