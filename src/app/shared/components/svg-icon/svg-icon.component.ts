import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input() name!: string; // The ID of the icon in the sprite
  @Input() width: number = 24;
  @Input() height: number = 24;
  @Input() color: string = 'currentColor'; // Allows inheriting text color
}
