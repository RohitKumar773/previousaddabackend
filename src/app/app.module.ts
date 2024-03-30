import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { NgToastModule } from 'ng-angular-popup';

import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManageBoardComponent } from './manage-board/manage-board.component';
import { AddBoardComponent } from './add-board/add-board.component';
import { ManageGovernmentExamComponent } from './manage-government-exam/manage-government-exam.component';
import { AddGovExamComponent } from './add-gov-exam/add-gov-exam.component';
import { ManageGovPreviousQuestionComponent } from './manage-gov-previous-question/manage-gov-previous-question.component';
import { AddGovPreviousQuestionComponent } from './add-gov-previous-question/add-gov-previous-question.component';
import { ManageUniversityComponent } from './manage-university/manage-university.component';
import { AddUniversityComponent } from './add-university/add-university.component';
import { AddUniversityCourseComponent } from './add-university-course/add-university-course.component';
import { ManageUniversityCourseComponent } from './manage-university-course/manage-university-course.component';
import { ManageSemesterYearComponent } from './manage-semester-year/manage-semester-year.component';
import { AddSemYearComponent } from './add-sem-year/add-sem-year.component';
import { ManageUniversityQuestionComponent } from './manage-university-question/manage-university-question.component';
import { AddUniversityQuestionComponent } from './add-university-question/add-university-question.component';
import { ManageEntranceExamComponent } from './manage-entrance-exam/manage-entrance-exam.component';
import { AddEntranceExamComponent } from './add-entrance-exam/add-entrance-exam.component';
import { ManageEntranceQuestionComponent } from './manage-entrance-question/manage-entrance-question.component';
import { AddEntranceQuestionComponent } from './add-entrance-question/add-entrance-question.component';
import { ManageBoardClassComponent } from './manage-board-class/manage-board-class.component';
import { AddBoardClassComponent } from './add-board-class/add-board-class.component';
import { ManageBoardQuestionComponent } from './manage-board-question/manage-board-question.component';
import { AddBoardQuestionComponent } from './add-board-question/add-board-question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CnfirmBoxComponent } from './cnfirm-box/cnfirm-box.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBoardComponent,
    AddBoardClassComponent,
    AddBoardQuestionComponent,
    AddEntranceExamComponent,
    AddEntranceQuestionComponent,
    AddGovExamComponent,
    AddGovPreviousQuestionComponent,
    AddSemYearComponent,
    AddUniversityComponent,
    AddUniversityCourseComponent,
    AddUniversityQuestionComponent,
    CnfirmBoxComponent,
    DashboardComponent,
    HomeComponent,
    LoginPageComponent,
    ManageBoardComponent,
    ManageBoardClassComponent,
    ManageBoardQuestionComponent,
    ManageEntranceExamComponent,
    ManageEntranceQuestionComponent,
    ManageGovPreviousQuestionComponent,
    ManageGovernmentExamComponent,
    ManageSemesterYearComponent,
    ManageUniversityComponent,
    ManageUniversityCourseComponent,
    ManageUniversityQuestionComponent,
    SidebarComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
