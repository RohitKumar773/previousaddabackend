import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUniversity: number = 0;
  totalUniversityCourse: number = 0;
  totalUniversitySemester: number = 0;
  totalUniversityQuestion: number = 0;
  totalGovernmentExam: number = 0;
  totalGovernmentQuestion: number = 0;
  totalBoardExam: number = 0;
  totalBoardClass: number = 0;
  totalBoardQuestion:number = 0;
  totalEntranceExam:number = 0;
  totalEntranceQuestion:number = 0;

  constructor(
    private api: ServiceService
  ) { }


  ngOnInit(): void {


    // University view

    this.api.getUniversity().subscribe(
      (res: any) => {
        this.totalUniversity = res.data.length
      }
    ),

      this.api.getUniversityCourse().subscribe(
        (res: any) => {
          this.totalUniversityCourse = res.data.length
        }
      ),

      this.api.getSemester().subscribe(
        (res: any) => {
          this.totalUniversitySemester = res.data.length
        }
      ),

      this.api.getUniversityQuestion().subscribe(
        (res: any) => {
          this.totalUniversityQuestion = res.data.length
        }
      ),

      this.api.getGovernmentExam().subscribe(
        (res: any) => {
          this.totalGovernmentExam = res.data.length
        }
      ),

      this.api.getGovernmentQuestion().subscribe(
        (res: any) => {
          this.totalGovernmentQuestion = res.data.length
        }
      ),

      this.api.getBoard().subscribe(
        (res: any) =>{
          this.totalBoardExam = res.data.length
        }
      ),

      this.api.getBoardClass().subscribe(
        (res: any) => {
          this.totalBoardClass = res.data.length
        }
      ),

      this.api.getBoardQuestion().subscribe(
        (res:any) => {
          this.totalBoardQuestion = res.data.length
        }
      ),

      this.api.getEntrance().subscribe(
        (res:any) => {
          this.totalEntranceExam = res.data.length
        }
      ),

      this.api.getEntranceQuestion().subscribe(
        (res:any) => {
          this.totalEntranceQuestion = res.data.length
        }
      )

  }

}
