import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.scss']
})
export class UpdateSectionComponent implements OnInit {

  @Input() updateSection: any;
  constructor() { }

  ngOnInit(): void {
  }

}
