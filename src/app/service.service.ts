import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(
    private http: HttpClient
  ) { }

  // online url
  // Url:string = 'https://previousadda.000webhostapp.com/api/'

  // offline url
  Url: string = 'http://localhost/previousadd_api/'

  adminLogin(data: any) {
    return this.http.post<any>(this.Url + 'login_api.php', data)
  }

  //+++++++++++ Contact Components +++++++++++++++++++++++++

  contactView() {
    return this.http.get<any>(this.Url + 'contact_view.php')
  }

  deleteContact(data: any) {
    return this.http.post<any>(this.Url + 'delete_contact.php', data)
  }

  //+++++++++++++++ University Component +++++++++++++++++++++

  universityPost(data: any) {
    return this.http.post<any>(this.Url + 'university_insert.php', data);
  }

  getUniversity() {
    return this.http.get<any>(this.Url + 'university_view.php');
  }

  putUniversity(data: any) {
    return this.http.put<any>(this.Url + 'university_update.php', data);
  }

  deleteUniversity(data: any) {
    return this.http.post<any>(this.Url + 'delete_university.php', data);
  }

  //+++++++++++++++++ University Course Component +++++++++++++++++

  postUniversityCourse(data: any) {
    return this.http.post<any>(this.Url + 'university_course_insert.php', data);
  }

  getUniversityCourse() {
    return this.http.get<any>(this.Url + 'university_course_view.php');
  }

  putUniversityCourse(data:any){
    return this.http.put<any>(this.Url + 'university_course_update.php',data)
  }

  deleteUniversityCourse(data: any) {
    return this.http.post<any>(this.Url + 'university_course_delete.php', data);
  }

  getUniversityCourseFilter(data: any) {
    return this.http.post<any>(this.Url + 'university_course_filter.php', data);
  }


  //++++++++++++++++++++++ University Semester Component +++++++++++++++++

  postSemester(data: any) {
    return this.http.post<any>(this.Url + 'semester_insert.php', data);
  }

  getSemester() {
    return this.http.get<any>(this.Url + 'semester_view.php');
  }

  delSemester(data: any) {
    return this.http.post<any>(this.Url + 'semester_delete.php', data);
  }

  getSemesterFilter(data: any) {
    return this.http.post<any>(this.Url + 'semester_filter.php', data);
  }

  //+++++++++++++++++++++ University Question Component ++++++++++++++++++++++

  postUniversityQuestion(data: any) {
    return this.http.post<any>(this.Url + 'university_question_insert.php', data);
  }

  getUniversityQuestion() {
    return this.http.get<any>(this.Url + 'university_question_view.php');
  }

  delUniversityQuestion(data: any) {
    return this.http.post<any>(this.Url + 'university_question_delete.php', data);
  }

  //+++++++++++++++++++++++ Government Question Component ++++++++++++++++++++

  postGovernmentExam(data: any) {
    return this.http.post<any>(this.Url + 'government_exam_insert.php', data);
  }

  getGovernmentExam() {
    return this.http.get<any>(this.Url + 'government_exam_view.php');
  }

  delGovernmentExam(data: any) {
    return this.http.post<any>(this.Url + 'delete_government_exam.php', data);
  }

  //+++++++++++++++++++ Government Question Component +++++++++++++++++

  postGovernmentQuestion(data: any) {
    return this.http.post<any>(this.Url + 'government_question_insert.php', data);
  }

  getGovernmentQuestion() {
    return this.http.get<any>(this.Url + 'government_question_view.php');
  }

  delGovernmentquestion(data: any) {
    return this.http.post<any>(this.Url + 'government_questin_delete.php', data);
  }

  //++++++++++++++++++++ Board Component +++++++++++++++++++++++++++++

  postBoard(data: any) {
    return this.http.post<any>(this.Url + 'board_insert.php', data);
  }

  getBoard() {
    return this.http.get<any>(this.Url + 'board_view.php');
  }

  deleteBoard(data: any) {
    return this.http.post<any>(this.Url + 'board_delete.php', data);
  }

  //+++++++++++++++++++ Board Class Component ++++++++++++++++++++++++++

  postBoardClass(data: any) {
    return this.http.post<any>(this.Url + 'board_class_insert.php', data);
  }

  getBoardClass() {
    return this.http.get<any>(this.Url + 'board_class_view.php');
  }

  deleteBoardClass(data: any) {
    return this.http.post<any>(this.Url + 'board_class_delete.php', data);
  }

  //+++++++++++++++++++ Board Question Component ++++++++++++++++++++++++

  postBoardQuestion(data: any) {
    return this.http.post<any>(this.Url + 'board_question_insert.php', data);
  }

  getBoardQuestion() {
    return this.http.get<any>(this.Url + 'board_question_view.php');
  }

  deleteBoardQuestion(data: any) {
    return this.http.post<any>(this.Url + 'board_question_delete.php', data);
  }

  getBoardClassFilter(data: any) {
    return this.http.post<any>(this.Url + 'board_class_fllter.php', data);
  }

  //++++++++++++++++++++ Entrance Exam Component +++++++++++++++++++

  postEntrance(data: any) {
    return this.http.post<any>(this.Url + 'entrance_insert.php', data);
  }

  getEntrance() {
    return this.http.get<any>(this.Url + 'entrance_view.php');
  }

  deleteEntranceExam(data: any) {
    return this.http.post<any>(this.Url + 'entrance_exam_delete.php', data);
  }

  //+++++++++++++++++++++ Entrance Question Component +++++++++++++++

  postEntranceQuestion(data: any) {
    return this.http.post<any>(this.Url + 'entrance_question_insert.php', data);
  }

  getEntranceQuestion() {
    return this.http.get<any>(this.Url + 'entrance_question_view.php');
  }

  deleteEntranceQuestion(data: any) {
    return this.http.post<any>(this.Url + 'entrance_question_delete.php', data)
  }
}