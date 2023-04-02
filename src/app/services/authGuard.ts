import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard = () => {
  const authService = inject(AuthService);

    if (authService.isAuthenticated()) {
      return true;
    }
    return authService.logout();


};
