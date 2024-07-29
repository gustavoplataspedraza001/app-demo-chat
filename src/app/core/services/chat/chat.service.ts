import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { chat } from 'src/app/global/endpoints';
import { ChatResponse, ConversationResponse, ConversationsRequest } from '../../models/chat';
import { catchError, timeout } from 'rxjs/operators';
//import { LoginRequest, LoginResponse } from 'src/app/core/models/chat'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');

    this.headers = new HttpHeaders ({})
  }

  // postMessage(chatMessage:any): Observable<any> {
  //   try {
    
  //   const httpOptions = {headers:this.headers}
  //   console.log(chatMessage.chat);
    
  //   return this.http.post<any>(chat.chat, chatMessage, httpOptions)
  //   .pipe(
  //     map(res => {
  //       console.log(res);
        
  //       return res;
  //     })
  //   )   
  //   } catch (error) {
  //       console.log(error);
  //       return new Observable<any>;
        
  //   }
  // }

  postMessage(chatMessage: any): Observable<any> {
    try {
      const httpOptions = { headers: this.headers };  
      return this.http.post<any>(chat.chat, chatMessage, httpOptions)
        .pipe(
          timeout(45000),
          catchError(error => {
            if (error instanceof TimeoutError) {
              console.log('Timeout:', error);
            } else {
              if (error.status !== 200) {
                
              }
            }
            return (error);
          })
        );
    } catch (error) {
      console.log(error);
      return new  Observable<any>;
    }
  }

  getAllMessages(keyword: string): Observable<ChatResponse[]> {
    
    const httpOptions = {headers:this.headers}
    const url = `${chat.chat}?keyword=${keyword}`;
    return this.http.get<ChatResponse[]>(url, httpOptions);
  }



  getConver(id: string):Observable<ConversationsRequest>{
    const httpOptions = {headers:this.headers};
    const url = `${chat.ownConverGet}${id}`;
    return this.http.get<ConversationsRequest>(url, httpOptions);
  }

  // getDosome(text: string, conver: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZWJhc3RpYW4udmlsbGFycmVhbEB0aWJzLmNvbS5teCIsImV4cCI6MTcxMDQ4MjI3NH0.9qGiFPBxP6KSh5FlvoZH7nqyEkDW-5S8zXhCuCxdoGU`
  //     })
  //   };    //const params = new HttpParams().set('text', text).set('conver', conver);
  //   console.log(httpOptions);
    
  //   return this.http.get<any>(`${chat.ownConverDosome}?text=${text}&conver=${conver}`);
  // }
  

}
//cual es el articulo con el precio publico mas alto, usa top en la consulta