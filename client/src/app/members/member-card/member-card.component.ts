import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  
  //This is a parent component which will get input from parent member-list component hence we use @input. The member variable is of type Member | undefined, because at runtime the component may not have the input value of member, this is done to satisfy type safety
  @Input() member : Member | undefined;

  ngOnInit(): void {
   
  }
}
