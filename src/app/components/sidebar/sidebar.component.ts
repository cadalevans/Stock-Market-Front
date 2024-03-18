import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dictionary', icon: 'ni-book-bookmark text-primary', class: '' },
    { path: '/icons', title: 'Trading', icon: 'ni ni-planet text-green', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'SICAV',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/stock', title: 'Stock', icon: 'ni ni-chart-bar-32 text-red', class: '' },
    { path: '/order', title: 'Orders', icon: 'ni ni-basket text-blue', class: '' },
    //{ path: '/sicavs', title: 'Orders', icon: 'ni ni-basket text-blue', class: '' },


    //{ path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
   // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });


    //----------- chatbot's code --------------//
    (function (d, m) {
      var kommunicateSettings = {
        appId: "dac47ee8ebde7cf700c0a18e30af83f7",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
    //----------- chatbot's code end --------------//
  }

  
}
