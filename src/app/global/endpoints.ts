import { environment } from './../../environments/environment';

export const auth = {
  login: `${environment.urlBaseChat}SignIn`,
  loginChat:`${environment.urlBaseChat}auth/login`
};


export const chat ={
  chat: `${environment.urlBaseChat}message`,
  ownConversations: `/api/conversations/`,//`${environment.urlBaseOwnChats}conversations`,
  ownConverGet:`/api/conversations/`,//`${environment.urlBaseOwnChats}conversations/`,
  ownConverDosome:`/api/pregunta`//`${environment.urlBaseOwnChats}dosome/`,
  //token:`${environment.urlBaseOwnChats}token/`
};
/*

import { environment } from './../../environments/environment';

export const auth = {
  login: `${environment.urlBaseChat}SignIn`,
  loginChat:`${environment.urlBaseChat}auth/login`
};


export const chat ={
  chat: `${environment.urlBaseChat}message`,
  ownConversations: `${environment.urlBaseOwnChats}conversations/`,
  ownConverGet:`${environment.urlBaseOwnChats}conversations/`,
  ownConverDosome:`${environment.urlBaseOwnChats}pregunta`,
  //token:`${environment.urlBaseOwnChats}token/`
};
*/