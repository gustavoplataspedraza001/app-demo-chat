import { Component, OnInit } from '@angular/core';
import { images } from 'src/app/global/constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  readonly images = images;
}
