import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'https://reqres.in/api/users';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient, private toastr: ToastrService) { }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}`).pipe(
            catchError(this.handleError)
        );
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}`, user).pipe(
            catchError(this.handleError)
        );;
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${id}`, user, { headers: this.headers }).pipe(
            catchError(this.handleError)
        );;
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.headers }).pipe(
            catchError(this.handleError)
        );;
    }

    private handleError(error: HttpErrorResponse) {
        this.toastr.error('Error', error.error.message);
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);

        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }

        return throwError(
            'Something bad happened; please try again later.');
    };
}