import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { images } from 'src/app/global/constants';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { ChatResponse, ConversationResponse } from 'src/app/core/models/chat';
import { TimeoutError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ChatDosomeService } from 'src/app/core/services/chat/chatdosome.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { identifierName } from '@angular/compiler';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  readonly images = images;
  //chat = "Ventas"
  user = localStorage.getItem('user')
  user2 = 'Juan Jose Martinez'
  bot = 'ChatBot'
  time = '9:30 am'
  listMessage: any[] = [];
  isCollapsed:boolean = false;
  mensaje: string = '';
  selectedContact: any;
  hovering: boolean = false;

  lastMessageList:any[] = [];

  elementoDeshabilitado: boolean = false;
  realizarFocus = true;
  currentDate = new Date();
  firstMessage:boolean = false; 
  fullscreen:boolean = true;
  typing:boolean = false;
  activeChat:string = "ventas";
  activeUrl:string = images.ventas
  fullScreen:boolean = false;
  isMostrarModal: boolean = false;

  //UsoComun/MisChats
  activeGroup:string = "own";
  converChats:string =''
  listConvers:any = {};
  messaegConver:string= '';
  saverTokenReal:any = '';
  selectedConver:string='';
  listOwnChats:ConversationResponse[]=[];
  activeConver:string= '';
  focusConver:boolean = false;

  //FOOTER
  showDataBrain = true;
  animate = false;
  showAnimationDone = false;


  constructor(private chatService: ChatService, private toastr: ToastrService,     private readonly router: Router,private chatDosomeService:ChatDosomeService
    ) { 
    }

  ngAfterViewInit():void {
    this.scrollToBottom();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.esPantallaMovil(); 
    this.esPantallaMovil() ? this.mostrarDerecha = true: this.mostrarDerecha = true;
    this.esPantallaMovil() ? this.mostrarIzquierda = false: this.mostrarIzquierda = true;
    this.esPantallaMovil() ? this.mostrarBoton = true: this.mostrarBoton = false
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }
  ngOnInit(): void {
    this.loadMessages("ventas");
    this.esPantallaMovil(); 
    this.esPantallaMovil() ? this.mostrarDerecha = true: this.mostrarDerecha = true;
    this.esPantallaMovil() ? this.mostrarIzquierda = false: this.mostrarIzquierda = true;
    this.esPantallaMovil() ? this.mostrarBoton = true: this.mostrarBoton = false
    //console.log("mToken",localStorage.getItem('token'));
    
    // this.chatService.getConver("65f379979a92d571847294df").subscribe((response) => {
    //   this.listConvers = response
    // })

    //
     /*this.chatDosomeService.provitionalLogin().subscribe((response)=>{
      localStorage.setItem('tokenDosome',response.access_token)
     });*/

     this.saverTokenReal = localStorage.getItem('token');

     this.chatDosomeService.getConver().subscribe((response)=>{
      console.log(response);
      console.log(response.id);
      this.listOwnChats = response;
      localStorage.setItem('token',this.saverTokenReal);
     }, error => {
      if (error instanceof TimeoutError) {
        console.log('Timeout:', error);
        this.typing = false;
        this.elementoDeshabilitado = false;
        this.realizarFocus
        this.toastr.error('Tiempo de conexión excedido', 'Timeout');
        localStorage.setItem('token',this.saverTokenReal);

      } else {
        console.log('Error:', error);
        this.toastr.error(error.status,'Error en la solicitud');
        if (error.status !== 200) {
          console.log('Respuesta no fue 200:', error);
          this.typing = false;
          this.elementoDeshabilitado = false;
          this.realizarFocus
          localStorage.setItem('token',this.saverTokenReal);

        }
        localStorage.setItem('token',this.saverTokenReal);

      }
    })
  }

  GetDate(fecha:string):string{
    const date = new Date(fecha);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
  GetHour(hora:string):string{
    const date = new Date(hora);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? ' p.m.' : 'a.m.';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')}${ampm}`;
    return formattedTime;
  }

  enviarMensaje(): void{
    
    const postData = {
      text: this.mensaje,
      isQuestion: true,
      chat:this.activeChat
    };
    //console.log(postData);
    
    if (this.mensaje != "") {
      this.mensaje = "";
      this.listMessage.push({isQuestion:true, text:postData.text, user:"", time: this.GetHour(this.currentDate.toString())});
      //this.listMessage.push({isQuestion:false, text:"", user:"Procesando"})
      this.typing = true;
      this.elementoDeshabilitado = true;
      this.chatService.postMessage(postData).subscribe(response => {
        //this.listMessage.pop();
        this.typing= false;
        //console.log(response);
        
        this.listMessage.push({...response, time:this.GetHour(this.currentDate.toString())})
        this.elementoDeshabilitado = false;
        this.realizarFocus;
      }, error => {
        if (error instanceof TimeoutError) {
          console.log('Timeout:', error);
          this.typing = false;
          this.elementoDeshabilitado = false;
          this.realizarFocus
          this.toastr.error('Tiempo de conexión excedido', 'Timeout');
        } else {
          console.log('Error:', error);
          this.toastr.error(error.status,'Error en la solicitud');
          if (error.status !== 200) {
            console.log('Respuesta no fue 200:', error);
            this.typing = false;
            this.elementoDeshabilitado = false;
            this.realizarFocus
          }
        }
      }); 
    }
  }
  mostrarIzquierda = false;
  ocuparAnchoCompleto = false; 
  iconoBoton = 'fa fa-user';
  mostrarDerecha = true;
  mostrarBoton = false;

  toggleSides(type:string) {
    if (type == 'hide') {
      this.fullScreen = false
      this.mostrarIzquierda = true
      this.mostrarDerecha = true
    }else{
      
      switch (type) {
        case 'ventas':
          this.listMessage = [];
          this.activeChat = type;
          this.activeUrl = images.ventas;
          break;
        case 'compras':          
          this.listMessage = [];
          this.activeChat = type;
          this.activeUrl = images.buys;
        break;
        case'inventarios':          
          this.listMessage = [];
          this.activeChat = type;
          this.activeUrl = images.inventory;
        break;
        case'cuentaspagar':          
          this.listMessage = [];
          this.activeChat = type;
          this.activeUrl = images.cuentasPagar;
        break;
        default:
          this.activeUrl = this.activeUrl;
          break;
      }
      if (type!="coming soon") {
        this.loadMessages(this.activeChat);      
      }
      if (!this.mostrarIzquierda){
        if( this.esPantallaMovil() || type == '') {      
          this.mostrarDerecha = false;
          this.mostrarIzquierda = true;
          this.iconoBoton = 'fa fa-comments'; 
        
        }
      } else {      
        if (this.esPantallaMovil() || type == '') {
          if (type == '' && !this.esPantallaMovil()) {
            this.fullScreen = true;
          }
          this.mostrarDerecha = true;
          this.mostrarIzquierda = false;
          this.iconoBoton = 'fa fa-user'; 
        }
      }
    }
  }

  esPantallaMovil() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.ocuparAnchoCompleto = width < 770; 

    return width < 770;
  }

  loadMessages(chat: string){
    this.chatService.getAllMessages(chat).subscribe((response) => {

      this.listMessage = response.map(e=>{
        return {
          createdAt: e.createdAt,
          isQuestion: e.isQuestion,
          text: e.text,
          updatedAt: e.updatedAt,
          user: e.user,
          time: this.GetHour(e.createdAt)
        }
      })

      this.firstMessage = (this.GetDate(this.listMessage[this.listMessage.length-1].createdAt) == this.GetDate(this.currentDate.toString()));
      if(!this.firstMessage){
        this.listMessage.push({isQuestion:false, text:"Buen dia, que puedo hacer hoy por ti " + this.user , user:this.bot, time: this.GetHour(this.currentDate.toString())})
      }
      const jsonMensaje= {
        chat:chat,
        lastMessage:this.listMessage[this.listMessage.length-1].text == undefined ? "" :this.listMessage[this.listMessage.length-1].text,
        lastTime:this.listMessage[this.listMessage.length-1].text == undefined ? "" :this.listMessage[this.listMessage.length-1].time
      }
       this.lastMessageList.push(jsonMensaje)
    });   
  }

  getLastTime(chat:string):string{
    const objt = this.lastMessageList.find(obj => obj.chat === chat);
    return objt ? objt.lastTime : "";
  }
  getLastMessage(chat:string):string{
    const objt = this.lastMessageList.find(obj => obj.chat === chat);
    return objt ? objt.lastMessage : "";
  }

  mostrarModal() {
    this.isMostrarModal = !this.isMostrarModal;
  }

  cerrarSesion(){
    localStorage.setItem('token', '');
      //localStorage.setItem('idUsuario', data.Usuario.Id.toString());
      //localStorage.setItem('idPerfil', data.Usuario.IdPerfil.toString());
      //localStorage.setItem('usuario', data.Usuario.Usuario);
      //localStorage.setItem('nombrePersona', data.Usuario.NombrePersona);
      localStorage.setItem('user', '');
      //localStorage.setItem('fechaDesde', data.Usuario.Fecha);
      this.router.navigate(['/login'])
  }
  //conver
  swapGroupType(){
    this.activeGroup == "common" ? 
    this.activeGroup = "own"
    :
    this.activeGroup = "common";
  }

  sendMessageConver(){
    this.saverTokenReal = localStorage.getItem('token');
    if (this.activeConver == '') {
      const jsonSend = {
        name:this.messaegConver,
        description:this.messaegConver,
        messages:[],
        mail:''
      };
      
      this.typing = true;
      this.chatDosomeService.postConversation(jsonSend).subscribe((response) =>{
        this.listConvers = jsonSend;
        localStorage.setItem('token',this.saverTokenReal);
        this.listOwnChats.push(response);
        const message = this.messaegConver
        this.messaegConver =''
        this.listConvers.messages.push(
          {
            role:'user',
            content:message
          }
        )
        this.activeConver = response.id;
        this.chatDosomeService.getDosome(message,this.activeConver).subscribe((response) => {
          // this.listConvers.messages.push(
          //   {
          //     role:'system',
          //     content:response['resultado: ']
          //   }
          // );
          console.log(this.activeConver);
          this.typing = false;

          this.getConvers(this.activeConver);
          localStorage.setItem('token',this.saverTokenReal);
        }, error => {
          if (error instanceof TimeoutError) {
            console.log('Timeout:', error);
            this.typing = false;
            this.elementoDeshabilitado = false;
            this.realizarFocus
            this.toastr.error('Tiempo de conexión excedido', 'Timeout');
            localStorage.setItem('token',this.saverTokenReal);
  
          } else {
            console.log('Error:', error);
            this.toastr.error(error.status,'Error en la solicitud');
            if (error.status !== 200) {
              console.log('Respuesta no fue 200:', error);
              this.typing = false;
              this.elementoDeshabilitado = false;
              this.realizarFocus
              localStorage.setItem('token',this.saverTokenReal);
  
            }
          }
        })
      }, error => {
        if (error instanceof TimeoutError) {
          console.log('Timeout:', error);
          this.typing = false;
          this.elementoDeshabilitado = false;
          this.realizarFocus
          this.toastr.error('Tiempo de conexión excedido', 'Timeout');
          localStorage.setItem('token',this.saverTokenReal);

        } else {
          console.log('Error:', error);
          this.toastr.error(error.status,'Error en la solicitud');
          if (error.status !== 200) {
            console.log('Respuesta no fue 200:', error);
            this.typing = false;
            this.elementoDeshabilitado = false;
            this.realizarFocus
            localStorage.setItem('token',this.saverTokenReal);

          }
        }
      })
    }else{
      const message = this.messaegConver
      this.messaegConver =''
      this.listConvers.messages.push(
        {
          role:'user',
          content:message
        }
      )
      this.typing = true;

      this.chatDosomeService.getDosome(message,this.activeConver).subscribe((response) => {
        
        // this.listConvers.messages.push(
        //   {
        //     role:'system',
        //     content:response['resultado: ']
        //   }
        // );
        this.typing = false;

        this.getConvers(this.activeConver)
        localStorage.setItem('token',this.saverTokenReal);
      }, error => {
        if (error instanceof TimeoutError) {
          console.log('Timeout:', error);
          this.typing = false;
          this.elementoDeshabilitado = false;
          this.realizarFocus
          this.toastr.error('Tiempo de conexión excedido', 'Timeout');
          localStorage.setItem('token',this.saverTokenReal);

        } else {
          console.log('Error:', error);
          this.toastr.error(error.status,'Error en la solicitud');
          if (error.status !== 200) {
            console.log('Respuesta no fue 200:', error);
            this.typing = false;
            this.elementoDeshabilitado = false;
            this.realizarFocus
            localStorage.setItem('token',this.saverTokenReal);

          }
        }
      })
    }
  }
  addConver(){
    this.activeConver = '';
    this.listConvers = [];
    this.focusConver = true;
  }
  changeConver(item:ConversationResponse){
    if (item.id === undefined || item.id === null) {
      item.id = '65f68a278d4663087e387f67';
    }
    console.log(item.id);
    
    this.chatService.getConver(item.id).subscribe((response) =>{
      console.log("este ocupo",response);
      this.activeConver = item.id;
      this.listConvers = response;
    }, error => {
      if (error instanceof TimeoutError) {
        console.log('Timeout:', error);
        this.typing = false;
        this.elementoDeshabilitado = false;
        this.realizarFocus
        this.toastr.error('Tiempo de conexión excedido', 'Timeout');
        localStorage.setItem('token',this.saverTokenReal);

      } else {
        console.log('Error:', error);
        this.toastr.error(error.status,'Error en la solicitud');
        if (error.status !== 200) {
          console.log('Respuesta no fue 200:', error);
          this.typing = false;
          this.elementoDeshabilitado = false;
          this.realizarFocus
          localStorage.setItem('token',this.saverTokenReal);

        }
      }
    })
  }

  getConvers(id:string){
    this.chatService.getConver(id).subscribe((response) =>{
      console.log("este ocupo",response);
      this.activeConver = id;
      this.listConvers = response;
    }, error => {
      if (error instanceof TimeoutError) {
        console.log('Timeout:', error);
        this.typing = false;
        this.elementoDeshabilitado = false;
        this.realizarFocus
        this.toastr.error('Tiempo de conexión excedido', 'Timeout');
        localStorage.setItem('token',this.saverTokenReal);

      } else {
        console.log('Error:', error);
        this.toastr.error(error.status,'Error en la solicitud');
        if (error.status !== 200) {
          console.log('Respuesta no fue 200:', error);
          this.typing = false;
          this.elementoDeshabilitado = false;
          this.realizarFocus
          localStorage.setItem('token',this.saverTokenReal);

        }
      }
    })
  }
}
//Generar el reporte de ventas en una sucursal y lo envia por correo

//Generar el reporte de dias de inventario, del 3 de enero al 17 de febero del 2024, con el proveedor 460, el destino es sebas_villalva13@hotmail.com