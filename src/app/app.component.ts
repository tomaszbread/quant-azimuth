import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'quant-azimuth-tomasz-chlebek';

  constructor(public auth: AuthService) {
    this.auth.state.subscribe(
      authorized => { }
    );
  }
  logout() {
    this.auth.logout();
  }


}
