import { Injectable } from '@angular/core';
import { DrumsEnum, ISound } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private sound: HTMLAudioElement | undefined;
  constructor() {}

  private _drumKit: Array<ISound> = [
    {
      key: 'A',
      sound: DrumsEnum.Kick,
    },
    {
      key: 'S',
      sound: DrumsEnum.Kick1,
    },
    {
      key: 'D',
      sound: DrumsEnum.Ride,
    },
    { key: 'F', sound: DrumsEnum.Snare1 },
    {
      key: 'G',
      sound: DrumsEnum.Crash1,
    },
    {
      key: 'H',
      sound: DrumsEnum.GateKick,
    },
  ];

  public getDrumKit(): Array<ISound> {
    return this._drumKit;
  }

  public playSound(sound: DrumsEnum): void {
    const filePath: string = 'assets/audio/'.concat(sound);
    console.log(filePath);
    if (typeof window != 'undefined') {
      console.log('executed');
      this.sound = new Audio(filePath);

      this.sound.play().then(() => {
        console.log('executeda');
        this.sound?.remove();
      });
    }
  }
}
