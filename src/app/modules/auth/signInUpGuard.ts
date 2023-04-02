import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

export const signInUpGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router)

  if (!authService.isAuthenticated()) {
    return true;
  }
  return router.navigate(['']);


};
