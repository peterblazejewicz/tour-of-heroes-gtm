import { Component } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from "@angular/router";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { HeroService } from "./hero.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Tour of Heroes";

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    heroService: HeroService
  ) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((route) => {
        // TODO tracing
      });
    router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        const routeData: any = (data as RoutesRecognized).state?.root
          ?.firstChild?.data;

        const { pageViewName } = routeData;
        // TODO page impression
      });
    heroService.getRandomHero().subscribe((hero) => {
      const currentHero = hero;
      if (currentHero) {
        // TODO user tracking
      }
    });
  }
}
