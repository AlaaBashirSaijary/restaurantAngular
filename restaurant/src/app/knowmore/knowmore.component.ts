import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-knowmore',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './knowmore.component.html',
  styleUrl: './knowmore.component.css'
})
export class KnowmoreComponent implements OnInit{
  constructor(
    ){}
  ngOnInit() {}
}
