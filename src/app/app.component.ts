import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  spaceSection = [
    {
      imgSrc: '../assets/Image-144.png',
      heading: 'Ocean Golden',
      content: 'Pitt Street Kirribilli NSW 2061',
    },
    {
      imgSrc: '../assets/Image-145.png',
      heading: 'TheMadbrains',
      content: 'Pitt Street Kirribilli NSW 2061',
    },
    {
      imgSrc: '../assets/Image-146.png',
      heading: 'Paranjape Towers',
      content: 'Pitt Street Kirribilli NSW 2061',
    },
    {
      imgSrc: '../assets/Image-148.png',
      heading: 'M3M Woodshire',
      content: 'Pitt Street Kirribilli NSW 2061',
    }
  ];

  blogSection = [
    {
      imgSrc: '../assets/Image-156.png',
      heading: 'Cleanliness Tips as You Cowork',
      content: 'Work from any corner on the entire floor without any interruption. Work from any corner on the entire floor without any interruption',
    },
    {
      imgSrc: '../assets/Image-157.png',
      heading: 'Awards, Happenings, Spaces',
      content: 'Work from any corner on the entire floor without any interruption. Work from any corner on the entire floor without any interruption',
    },
    {
      imgSrc: '../assets/Image-158.png',
      heading: 'Ranking the World’s Fastest',
      content: 'Work from any corner on the entire floor without any interruption. Work from any corner on the entire floor without any interruption',
    },
    {
      imgSrc: '../assets/Image-159.png',
      heading: 'Unique Features of Servcorp’s',
      content: 'Work from any corner on the entire floor without any interruption. Work from any corner on the entire floor without any interruption',
    }
  ];
  constructor() {

  }

  ngOnInit(): void {

  }
}
