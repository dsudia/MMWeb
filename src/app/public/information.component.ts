import { Component } from '@angular/core';

@Component({
    selector: 'information',
    templateUrl: './information.html',
    styleUrls: ['./information.scss']
})

export class InformationComponent {
  description_hidden = false;
  school_hidden = true;
  teacher_hidden = true;

  showTeacherDescription() {
    this.description_hidden = true;
    this.school_hidden = true;
    this.teacher_hidden = false;
  }

  showSchoolDescription() {
    this.description_hidden = true;
    this.school_hidden = false;
    this.teacher_hidden = true;
  }

}
