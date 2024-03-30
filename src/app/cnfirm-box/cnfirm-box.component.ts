import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cnfirm-box',
  templateUrl: './cnfirm-box.component.html',
  styleUrls: ['./cnfirm-box.component.css']
})
export class CnfirmBoxComponent implements OnInit{
  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog:MatDialogRef<CnfirmBoxComponent>
  ){}

  ngOnInit(): void {
    
  }

}
