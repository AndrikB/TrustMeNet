import {Component, Input, OnInit} from '@angular/core';
import {Achievement} from "../../core/models/achievement";
import {AchievementService} from "../../core/services/achievement.service";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  cards: Achievement[];
  slides: any = [[]];
  @Input() userId: number;

  constructor(private achievementService: AchievementService) {
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit() {
    this.getCharacteristics();
  }

  getCharacteristics() {
    this.achievementService.getUserAchievements(this.userId).subscribe(achievement => {
        this.cards = achievement;
        this.slides = this.chunk(this.cards, 6);
      },
      err => {
        console.log(err);
      });
  }

}
