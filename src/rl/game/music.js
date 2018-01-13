///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// music.js
//
// Map generation and handling
//
///////////////////////////////////////////////////////////////

import { Howl } from "../lib/howler.min.js";

export class MusicController {
    constructor() {
        this.music = {}
        this.currentMusic = undefined;
    }

    prepareMusic(name, filename) {
        var sound = new Howl({
            src: [`music/${filename}.mp3`, `music/${filename}.ogg`],
            autoplay: false,
            loop: true,
          });        

          this.music[name] = sound;
    }

    play(name) {
        if ( !this.music[name]) return;

        if ( !!this.currentMusic ) {
            this.currentMusic.fade(1, 0, 1000);
        }

        this.currentMusic = this.music[name];
        this.currentMusic.play();
    }

    toggleMusic() {
        if ( !this.currentMusic ) return;

        if ( this.currentMusic.playing() ) {
            this.currentMusic.pause();
        } else {
            this.currentMusic.play();
        }
    }
}