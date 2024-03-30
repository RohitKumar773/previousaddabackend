import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CnfirmBoxComponent } from '../cnfirm-box/cnfirm-box.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  displayedColumns: string[] = ['std_id', 'std_name', 'std_email_id','std_message', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  conData:any
  deleteValue = 1;

  constructor(
    private service:ServiceService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.service.contactView().subscribe(
      (contactData:any) => {
        console.log(contactData)
        this.dataSource = new MatTableDataSource(contactData.data)
        this.conData = contactData.data.length
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

  delBoardCls(row:any){
    const deleteDialog = this.dialog.open(CnfirmBoxComponent, {
      disableClose:true,
      data: this.deleteValue
    });

    deleteDialog.afterClosed().subscribe(
      result => {
        if(this.deleteValue == result){
          const deletecontactdata = new FormData();
          deletecontactdata.append('std_id', row.std_id)
          this.service.deleteContact(deletecontactdata).subscribe(
            (res:any) => {
              console.log(res)
              alert('Message Deleted Successfully')
            },
            (error:any) => {
              console.log(error)
              alert('Data not deleted');
            }
          )
        }
      }
    )
  }

}