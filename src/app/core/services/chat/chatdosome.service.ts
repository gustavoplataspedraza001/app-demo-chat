import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatResponse, ConversationResponse, ConversationsRequest } from '../../models/chat';

import { chat } from 'src/app/global/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ChatDosomeService {

  

  constructor(private http: HttpClient) {}

  getDosome(text: string, conver: string): Observable<any> {
    //const token = localStorage.getItem('tokenDosome');
    //if (token !== null) {
    //  localStorage.setItem('token', token);
    //}
    return this.http.get<any>(`${chat.ownConverDosome}/${conver}?pregunta=${text}`);
  }

  postConversation(conver:ConversationsRequest):Observable<ConversationResponse>{
    ///const token = localStorage.getItem('tokenDosome');
    //if (token !== null) {
    //  localStorage.setItem('token', token);
    //} 
    return this.http.post<ConversationResponse>(chat.ownConversations, conver);
  }

  getConver():Observable<any>{
    //const token = localStorage.getItem('tokenDosome');
    //if (token !== null) {
      //localStorage.setItem('token', token);
    //}
    return this.http.get<any>(chat.ownConverGet);
  }


  /*provitionalLogin():Observable<any>{
    const formData = new FormData();
    formData.append('username', 'sebastian.villarreal@tibs.com.mx');
    formData.append('password', '1234567');
    return this.http.post<any>(chat.token, formData);
  }*/
}
