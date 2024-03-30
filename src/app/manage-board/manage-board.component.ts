import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddBoardComponent } from '../add-board/add-board.component';
import { ServiceService } from '../service.service';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-manage-board',
  templateUrl: './manage-board.component.html',
  styleUrls: ['./manage-board.component.css']
})
export class ManageBoardComponent implements OnInit {

  displayedColumns: string[] = ['board_id', 'board_name', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  bdData:any
  deleteValue = 1;

  constructor(
    private dialog: MatDialog,
    private service:ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getBoard().subscribe(
      (boardData:any) => {
        this.dataSource = new MatTableDataSource(boardData.data);
        this.bdData = boardData.data.length;
      }
    )
    
  }

  open_board() {
    this.dialog.open(AddBoardComponent, {
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

  delBoard(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deleteValue
    });
    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const delBoarddata = new FormData();
          delBoarddata.append('board_id',row.board_id),
          this.service.deleteBoard(delBoarddata).subscribe(
            (res:any) => {
              console.log(res)
              alert('Data deleted successfully');
            },
            (error:any) => {
              alert('Data Not deleted')
              console.log(error)
            }
          )
        }
      }
    )
  }

}