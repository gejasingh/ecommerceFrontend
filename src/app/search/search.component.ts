import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  router: any;
  constructor(private route:Router){}
  ngOnInit(): void {
    //  throw new Error('Method Not Implemented');
  }
  doSearch(value: string) {
    console.log(`Search value: ${value}`);  // Debugging line
    if (value) {
      this.router.navigateByUrl(`/search/${value}`);
    }
  }
} 
