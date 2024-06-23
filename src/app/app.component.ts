import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioService } from './services/audio.service';
import { ISound } from './models';
import { CommonModule } from '@angular/common';
import { KeyComponent } from './components/key/key.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, KeyComponent],
})
export class AppComponent {
  title = 'ng-drum-kit';

  public drumKit: Array<ISound>;
  constructor(private audioService: AudioService) {
    this.drumKit = audioService.getDrumKit();
  }
}
