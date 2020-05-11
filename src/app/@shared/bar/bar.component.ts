import { Component, OnInit } from '@angular/core';
import {
  CredentialsService,
  Credentials,
} from '../../auth/credentials.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  credential: Credentials;
  constructor(public credentialService: CredentialsService) {}

  ngOnInit() {
    this.credential = this.credentialService.credentials;
  }
}
