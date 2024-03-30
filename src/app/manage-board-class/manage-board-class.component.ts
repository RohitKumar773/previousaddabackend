import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddBoardClassComponent } from '../add-board-class/add-board-class.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-board-class',
  templateUrl: './manage-board-class.component.html',
  styleUrls: ['./manage-board-class.component.css']
})
export class ManageBoardClassComponent implements OnInit {

  displayedColumns: string[] = ['b_class_id', 'board_id_fk', 'class_name', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  boardClsData:any
  deleteValue = 1;

  constructor(
    private dialog: MatDialog,
    private service:ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getBoardClass().subscribe(
      (BoardClassData:any) => {
        this.dataSource = new MatTableDataSource(BoardClassData.data)
        this.boardClsData = BoardClassData.data.length
      }
    )
  }

  add_board_class() {
    this.dialog.open(AddBoardClassComponent, {
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

  delBoardCls(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deleteValue
    });
    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const delBoardClsdata = new FormData();
          delBoardClsdata.append('b_class_id',row.b_class_id),
          this.service.deleteBoardClass(delBoardClsdata).subscribe(
            (res:any) => {
              console.log(res)
              alert('Data deleted successfully');
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