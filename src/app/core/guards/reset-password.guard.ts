import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
    const token = route.queryParamMap.get('token');
    const tokenEncode = encodeURIComponent(token);
    console.log(tokenEncode);
    return true;
    // return new Observable<boolean>((observer) => {
    //     _identityService
    //         .checkResetPasswordToken(userId, tokenEncode)
    //         .subscribe({
    //             next: (response) => {
    //                 observer.next(true);
    //             },
    //             error: (error) => {
    //                 _router.navigate(['/sign-in']);
    //                 observer.next(false);
    //             },
    //         });
    // });
};
