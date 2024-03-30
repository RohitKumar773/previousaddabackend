import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUniversityComponent } from './manage-university/manage-university.component';
import { ManageUniversityCourseComponent } from './manage-university-course/manage-university-course.component';
import { ManageUniversityQuestionComponent } from './manage-university-question/manage-university-question.component';
import { ManageSemesterYearComponent } from './manage-semester-year/manage-semester-year.component';
import { ManageGovernmentExamComponent } from './manage-government-exam/manage-government-exam.component';
import { ManageGovPreviousQuestionComponent } from './manage-gov-previous-question/manage-gov-previous-question.component';
import { ManageBoardComponent } from './manage-board/manage-board.component';
import { ManageBoardClassComponent } from './manage-board-class/manage-board-class.component';
import { ManageBoardQuestionComponent } from './manage-board-question/manage-board-question.component';
import { ManageEntranceExamComponent } from './manage-entrance-exam/manage-entrance-exam.component';
import { ManageEntranceQuestionComponent } from './manage-entrance-question/manage-entrance-question.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [

  { path: '', component: LoginPageComponent, },
  { path: 'login_page', component: LoginPageComponent, },

  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, },
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'university', component: ManageUniversityComponent, },
      { path: 'university_course', component: ManageUniversityCourseComponent, },
      { path: 'university_semester', component: ManageSemesterYearComponent, },
      { path: 'university_question', component: ManageUniversityQuestionComponent, },
      { path: 'government_exam', component: ManageGovernmentExamComponent, },
      { path: 'government_question', component: ManageGovPreviousQuestionComponent, },
      { path: 'board_exam', component: ManageBoardComponent, },
      { path: 'board_class', component: ManageBoardClassComponent, },
      { path: 'board_question', component: ManageBoardQuestionComponent, },
      { path: 'entrance_exam', component: ManageEntranceExamComponent, },
      { path: 'entrance_question', component: ManageEntranceQuestionComponent, },
      { path: 'enquiry_details', component: ContactComponent, },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
