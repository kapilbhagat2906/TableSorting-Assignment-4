import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel, UserType } from '../models/user.model';
import { catchError, flatMap, map, reduce } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
    providedIn: "root"
})
export class UserService {
    handleHttpError: HandleError;

    constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler
    ) {
        this.handleHttpError = httpErrorHandler.createHandleError('UserService');
    }

    getUsers () : Observable<Array<UserType>> {
        return this.http.get<Array<UserType>>('https://jsonplaceholder.typicode.com/users')
            .pipe(
                flatMap((user) => user),
                map((user) => new UserModel(user)),
                reduce((acc: [], user) => {
                    return [...acc, user];
                }, []),
                catchError(this.handleHttpError<Array<UserModel>>('getUsers'))
            );
    }
}
