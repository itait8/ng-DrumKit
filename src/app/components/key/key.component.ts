import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DrumsEnum, ISound } from '../../models';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Observable,
  Subscription,
  debounce,
  debounceTime,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
})
export class KeyComponent implements OnInit, OnDestroy {
  private _sound: ISound = {
    key: '',
    sound: DrumsEnum.Kick,
  };

  private subscription: Subscription = new Subscription();

  @Input() set sound(sound: ISound) {
    this._sound = sound;
  }

  get sound() {
    return this._sound;
  }

  public keyDown$: Observable<KeyboardEvent>;
  public isPlaying: boolean = false;

  constructor(
    private audioService: AudioService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.keyDown$ = fromEvent(document, 'keypress').pipe(
      map((data) => data as KeyboardEvent),
      filter((data) => data.key === this.sound.key.toLowerCase()),
      tap((data) => {
        audioService.playSound(this.sound.sound);
        this.isPlaying = true;
      }),
      debounceTime(500),
      tap(() => (this.isPlaying = false))
    );
  }

  ngOnInit(): void {
    this.subscription.add(this.keyDown$.subscribe());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
