import { Component, OnInit } from '@angular/core';
import { ICommonType } from 'src/app/models/common.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}
  
    options: ICommonType[] = [
    { label: 'Albert Einstein', value: '3' },
    { label: 'Marie Curie', value: '4' },
    { label: 'Isaac Newton', value: '5' },
    { label: 'Ada Lovelace', value: '6' },
    { label: 'Nikola Tesla', value: '7' },
    { label: 'Leonardo da Vinci', value: '8' },
    { label: 'Jane Austen', value: '9' },
    { label: 'Wolfgang Mozart', value: '10' },
    { label: 'Cleópatra', value: '11' },
    { label: 'Vincent van Gogh', value: '12' },
    { label: 'Bill Gates', value: '13' }
  ];

  ngOnInit(): void {
    
  }

}
