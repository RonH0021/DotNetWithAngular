import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports:[CommonModule,TabsModule,GalleryModule]
})
export class MemberDetailComponent implements OnInit {

  member :Member | undefined;
  images: GalleryItem[]= [];

  //Inject Member service to get the details of the member based on userName
  //Inject ActivatedRoute so that we can get userName which will be sent as parameter in the route
  constructor(private memberService : MembersService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    //Get the userName parameter from the route
    const userName = this.route.snapshot.paramMap.get('userName');
    
    //if no userName parameter present in parameter then end processing
    if(!userName) return;

    //else call the getMember method from member service and based on the userName get member details
    this.memberService.getMember(userName).subscribe({
      next: member =>{
        this.member = member;
        this.getImages(); //Populate the Images Array
      } 
    })
  }

  //This method will check the member, and all the photos of that member
  //For each photo in member.photo, add an object of type imageItem into images array
  getImages(){
    if(!this.member) return;
    for (const photo of this.member.photos)
    {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  }

}
