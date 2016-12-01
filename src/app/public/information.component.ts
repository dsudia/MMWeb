import { Component } from '@angular/core';

@Component({
    selector: 'information',
    templateUrl: './information.html',
    styleUrls: ['./information.css']
})

export class InformationComponent {
  description_hidden = false;
  school_hidden = true;
  teacher_hidden = true;

  showTeacherDescription() {
    console.log('teacher description');
    this.description_hidden = true;
    this.school_hidden = true;
    this.teacher_hidden = false;
  }

  showSchoolDescription() {
    console.log('school description');
    this.description_hidden = true;
    this.school_hidden = false;
    this.teacher_hidden = true;
  }

}
