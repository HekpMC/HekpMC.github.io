import Unsplash from 'unsplash-js';
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import PhotoUserInterface from "./photoInterface.js";
import Header from "./header.js";
import ExpandedPhoto from "./expandedPhoto.js";


// Создаем экземпляр объекта для доступа к API
let unsplash = new Unsplash({
   // accesskey из настроек вашего приложения
   accessKey: '7NgckJCjWws5MPW-XCJkuTcKjGWayzRDi8XMAkDmKBQ',
   // Application Secret из настроек вашего приложения
   secret: 'Zxc6BCHMS9aPPC0-0wXoZ8c8Z2mwUFdS1POpWnZVLIY',
   // Полный адрес страницы авторизации приложения (Redirect URI)
   // Важно: этот адрес обязательно должен быть указан в настройках приложения
   // на сайте Unsplash API/Developers
   callbackUrl: "https://hekpmc.github.io/unsplash/dist/index.html"
});

// Генерируем адрес страницы аутентификации на unsplash.com
// и указываем требуемые разрешения (permissions)
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos",
  "write_likes",
]);   

// Считываем GET-параметр code из URL
// www.example.com/auth?code=abcdef123456...
const code = location.search.split('code=')[1];

class Page extends Component {
   constructor() {
       super();

      this.state = {
         img: [],
         expanded:-1,
         list:1,
         scrolLock:true
      };
   }; 

   showImageInfo(key){
      let imgState= this.state.img;
      imgState[key].selected = true;         
      this.setState(imgState);            
   }
   hideImageInfo(key){
      let imgState= this.state.img;
      imgState[key].selected = false;         
      this.setState(imgState);            
   }
   expandPhoto(key){
      let state= this.state;
      state.expanded = key;       
      this.setState(state);          
   }
   collapsePhoto(){
      let state= this.state;
      state.expanded = -1;       
      this.setState(state);      
   }
   likePhoto(key){
      unsplash.photos.likePhoto(this.state.img[key].idImg);      
   }
   listPhotos(number){
      unsplash.photos.listPhotos(this.state.list,number)
      .then(res => res.json())
      .then(json => {
         //console.log(json);
         let state= this.state;
         for (let i=0; i < json.length; i++){  
            let img = {
               idUser: json[i].user.id,
               avatar: json[i].user.profile_image.small,
               name: json[i].user.name,
               nickname: json[i].user.username,
               idImg: json[i].id,
               urls: json[i].urls.small,
               like: json[i].liked_by_user,
               download: {
                  small: json[i].urls.small,
                  medium: json[i].urls.regular,
                  lage: json[i].urls.full,
                  original: json[i].urls.raw,
               },
               alt: json[i].alt_description,
               selected: false               
            }
            state.img.push(img);   
         }
         state.list=state.list+1;
         //console.log(imgState)
         this.setState(state);
      })
   }

   testfun(){
      console.log("test");
   }

   
   componentDidMount() {
      unsplash.photos.getRandomPhoto({count: 1})
      .then(res => {
         if (!res.ok){            
            unsplash._accessKey="bEX2N9LmpNzctAlYPSkX36NeeiunpDxFHWBvVly12RA";
            unsplash._secret="Xmi4XdY0csBBWXxXxF5FgswTsS1dRw7DSbbvx-kEhHs";     
         }         
         if (code) {
            // Если код передан, отправляем запрос на получение токена
            unsplash.auth.userAuthentication(code)
            .then(res => {
               if (!res.ok){
                  console.log(res.status);
                  unsplash.auth.setBearerToken(localStorage.access_token);      
                  unsplash.currentUser.profile()
                  .then(res => res.json())
                  .then(json => {
                     console.log('currentUser_json:');
                     console.log(json);
                     let loginButton = document.querySelector('.userName');
                     loginButton.textContent = json.username;
                     let userIcon = document.querySelector('.userIcon');
                     userIcon.src = json.profile_image.small;
                  });          
               }
               else {
                  res.json()         
                  .then(json => {
                     console.log(json);
                     localStorage.access_token = json.access_token;
                     unsplash.auth.setBearerToken(localStorage.access_token);      
                     unsplash.currentUser.profile()
                     .then(res => res.json())
                     .then(json => {
                        console.log('currentUser_json:');
                        console.log(json);
                        let loginButton = document.querySelector('.userName');
                        loginButton.textContent = json.username;
                        let userIcon = document.querySelector('.userIcon');
                        userIcon.src = json.profile_image.small;
                     });      
                  });               
               }
               this.listPhotos(10);
            })
         }
         else{
            console.log(unsplash._accessKey);
            // Отправляем пользователя по этому адресу   
            let loginButton = document.querySelector('.userName');
            this.listPhotos(30);
            loginButton.onclick=()=>{ 
               location.assign(authenticationUrl) 
            };
            window.onscroll('scroll', this.testfun());            
         }
      })      
   }  

   render () {
       return (
         <div>
            <Header/>
            <main>               
               {this.state.expanded>-1?
                  <ExpandedPhoto 
                  img={this.state.img[this.state.expanded]}
               />:""}
               <ul className = "grid">
               {this.state.img.map((img, i) =>{
                  return(
                     <li 
                     key={i}
                     className="grid-item"
                     onMouseEnter={()=>this.showImageInfo(i)}
                     onMouseLeave={()=>this.hideImageInfo(i)}>                              
                        <img
                        src={img.urls} 
                        className="photo"                           
                        />  
                        {img.selected?
                        <PhotoUserInterface 
                        avatar = {img.avatar}
                        name={img.name}
                        like={img.like}
                        ind ={i}
                        expandPhoto={this.expandPhoto.bind(this)}
                        likePhoto={this.likePhoto.bind(this)}
                        />:""}                        
                     </li>
                  )}
               )}
               </ul>
            </main>
         </div>            
      )
   }
}

ReactDOM.render(<Page />, document.querySelector(".сontaner"));



