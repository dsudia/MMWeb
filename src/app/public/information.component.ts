import { Component } from '@angular/core';

@Component({
    selector: 'information',
    templateUrl: './information.html',
    styleUrls: ['./information.css']
})

export class InformationComponent {
  description_content = "<p>Click a profile type above <i class='fa fa-hand-o-up' aria-hidden='true'></i>to learn more</p>";

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
