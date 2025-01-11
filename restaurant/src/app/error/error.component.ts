import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from '../Servises/Error/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  statusCode: number | undefined;
  isError:boolean=true;

  constructor(private route: ActivatedRoute, private router: Router,errorServin:ErrorService) {
    errorServin.isError.subscribe((isError)=>{this.isError=isError});
  }

  ngOnInit(): void {

  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
