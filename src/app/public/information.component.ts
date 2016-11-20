import { Component } from '@angular/core';

@Component({
    selector: 'information',
    templateUrl: './information.html',
    styleUrls: ['./information.css']
})

export class InformationComponent {
  description = "";

  showTeacherDescription() {
    console.log('teacher description');
  }

  showSchoolDescription() {
    console.log('school description');
  }

  showDescription(type) {
    console.log('clicked', type);
  }
}
