import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GetCurrentUserOutput} from 'aws-amplify/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  @Input() user?: GetCurrentUserOutput;
  @Output() logOut = new EventEmitter<void>();
}
