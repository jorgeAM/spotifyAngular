import { Component, OnInit } from '@angular/core';
//importamos modelo song
import { Song } from '../models/song';

@Component({
  selector: 'player',
  templateUrl: '../views/player.component.html',
})
export class PlayerComponent implements OnInit{
	public url = "http://localhost:3100/api/";
	public song;

	ngOnInit(){
		console.log('play')
		this.song = new Song(0,'','','','')
	}

}
  