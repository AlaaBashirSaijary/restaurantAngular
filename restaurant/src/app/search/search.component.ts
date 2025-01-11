import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // استيراد FormsModule

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm:String="";
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchTerm'])
      this.searchTerm=params['searchTerm'];
      console.log('Search Term:', this.searchTerm);

    });
  }
  search():void{
if(this.searchTerm)
  this.router.navigate(['/search/', this.searchTerm]);
}
  constructor(private route:ActivatedRoute,private router:Router){}

}
