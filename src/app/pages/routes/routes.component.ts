import {Component, OnInit} from '@angular/core';
import {RoutesService} from './routes.service';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  code: string;
  name: string;
  routes: { lat: string, lng: string }[] = [];

  constructor(private service: RoutesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.service.get(param.id)
        .pipe(
          map(data => {
            for (let key in data) {
              switch (key) {
                case 'idlinha':
                  break;
                case 'nome':
                  this.name = data[key];
                  break;
                case 'codigo':
                  this.code = data[key];
                  break;
                default:
                  this.routes.push(data[key]);
                  break;
              }
            }
            return {
              code: this.code,
              name: this.name,
              routes: this.routes
            };
          })
        )
        .subscribe(data => {
          console.log(data);
        });
    });
  }

  onMaps(route: { lat: string; lng: string }) {
    window.open('https://www.google.com/maps/?q=' + route.lat + ',' + route.lng);
  }

  onBack() {
    window.history.back();
  }
}
