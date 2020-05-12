import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { appAnimations } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: appAnimations,
})
export class HomeComponent implements OnInit {
  data = {
    name: 'ReserveCloud',
    bio: `Reserva online, encuentra tus sitios habituales`,
    image:
      'https://reservecloud-app.herokuapp.com/assets/entity-system-management@192.png',
  };
  searchInput = new FormControl();
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio },
      { name: 'og:image', content: this.data.image },
    ]);
  }
  search() {}
}
