import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-explicit-subscribe',
  template: `<div>{{ value }}</div>`,
})
export class ExplicitSubscribeComponent implements OnInit {
  value: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.valueChanges.subscribe((value) => {
      this.value = value;
    });
  }
}
