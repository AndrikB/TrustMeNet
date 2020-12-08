import { Component, OnInit } from '@angular/core';
import {
  Achievement,
  AchievementCharacteristic,
  AchievementCondition,
  ConditionOperator
} from '../../core/models/achievement';
import {AchievementService} from '../../core/services/achievement.service';
import {AlertService} from '../../core/services/alert.service';

@Component({
  selector: 'app-create-achievement',
  templateUrl: './create-achievement.component.html',
  styleUrls: ['./create-achievement.component.css']
})
export class CreateAchievementComponent implements OnInit {

  achievement: Achievement = new Achievement();
  characteristics: AchievementCharacteristic[] = [];
  operators = ConditionOperator;
  operatorName: any;
  conditions: AchievementCondition[] = [new AchievementCondition()];
  message = '';
  isInvalid = false;
  number: number;


  constructor(private achievementService: AchievementService,
              private alertService: AlertService) {
    this.operatorName = Object.keys(ConditionOperator).filter(x => !(parseInt(x) >= 0));
  }

  ngOnInit() {
    this.getCharacteristics();
  }

  addCondition() {
    this.conditions.push(new AchievementCondition());
  }

  removeCondition(i: number) {
    this.conditions.splice(i, 1);
  }

  isValid(): boolean {
    if (this.achievement.name == null || this.achievement.name.length == 0) {
      this.message = "NAME";
      this.number = 0;
      return false
    }
    if (this.achievement.description == null || this.achievement.description.length == 0) {
      this.message = "DESCRIPTION";
      this.number = 0;
      return false
    }
    if (this.achievement.achievementConditions.length < 1) {
      this.message = "CONDITION";
      this.number = 0;
      return false
    }
    for (let i = 0; i < this.achievement.achievementConditions.length; i++) {
      let condition = this.achievement.achievementConditions[i];
      if (condition.characteristicId == null) {
        this.message = `CHARACTERISTIC`;
        this.number = i + 1;
        return false
      }
      if (condition.operator == null) {
        this.message = `OPERATOR`;
        this.number = i + 1;
        return false
      }
      if (condition.value == null || condition.value == 0) {
        this.message = `VALUE`;
        this.number = i + 1;
        return false;
      }
    }
    return true;
  }

  send() {
    this.achievement.achievementConditions = this.conditions;
    if (!this.isValid()) {
      this.isInvalid = true;
    } else {
      this.achievementService.sendAchievement(this.achievement).subscribe(
        data => {
          if (data) {
            this.alertService.success('DASHBOARD.ACHIEVEMENT_VALIDATION.SUCCESSFUL', false);
            this.isInvalid = false;
            this.achievement.name = "";
            this.achievement.description = "";
            this.conditions = [new AchievementCondition()];
          } else {
            this.alertService.error('DASHBOARD.ACHIEVEMENT_VALIDATION.ERRORED', false);
          }
        },
        error => {
          this.alertService.error('DASHBOARD.ACHIEVEMENT_VALIDATION.ERRORED');
          this.message = `DASHBOARD.ACHIEVEMENT_VALIDATION.ERRORED`;
          console.log(error);
        });
    }
  }

  getCharacteristics() {
    this.achievementService.getCharacteristics().subscribe(characteristics => {
        this.characteristics = characteristics;
      },
      err => {
        console.log(err);
      });
  }
}
