import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-paragraph-h1',
  templateUrl: './paragraph-h1.component.html',
  styleUrls: ['./paragraph-h1.component.scss']
})
export class ParagraphH1Component {

  @Input() text: string = ''

}
