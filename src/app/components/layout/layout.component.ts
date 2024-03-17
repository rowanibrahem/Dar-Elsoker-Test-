import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { initFlowbite } from 'flowbite';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { IsLoaderService } from '../../services/loader/is-loader.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NzLayoutModule,
    NzSkeletonModule,
  ],
  providers: [RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  constructor(
    private _OAuthService: OAuthService,
    public _IsLoaderService: IsLoaderService
  ) {}
  
  ngOnInit(): void {
    initFlowbite();
  }

  signOut() {
    this._OAuthService.logOut();
  }
}
