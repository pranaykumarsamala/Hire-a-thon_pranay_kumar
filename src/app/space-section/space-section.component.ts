import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-section',
  templateUrl: './space-section.component.html',
  styleUrls: ['./space-section.component.scss']
})
export class SpaceSectionComponent implements OnInit {

  @Input() spaceSection: any;
  constructor() { }

  ngOnInit(): void {
  }

}
