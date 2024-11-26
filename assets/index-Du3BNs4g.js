var l=Object.defineProperty;var d=(o,e,t)=>e in o?l(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var r=(o,e,t)=>d(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class h{constructor(){r(this,"container");r(this,"contentElement");r(this,"inputElement");r(this,"state",{messages:[],isTyping:!1});r(this,"isOpen",!1);this.container=document.createElement("div"),this.container.className="chatbot-widget",this.init()}init(){var a;const e=document.createElement("button");e.className="chatbot-toggle",e.innerHTML=`
      <div class="chatbot-toggle-content">
        <div class="chatbot-toggle-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" fill="currentColor"/>
            <circle cx="8" cy="12" r="1.5" fill="white"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
            <circle cx="16" cy="12" r="1.5" fill="white"/>
          </svg>
        </div>
      </div>
    `;const t=document.createElement("div");t.className="chatbot-container";const i=document.createElement("div");i.className="chatbot-header",i.innerHTML=`
      <div class="chatbot-header-info">
        <div class="chatbot-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" fill="currentColor"/>
          </svg>
        </div>
        <div>
          <h3>Виртуальный помощник</h3>
          <span class="chatbot-status">
            <span class="status-dot"></span>
            Онлайн
          </span>
        </div>
      </div>
      <button class="chatbot-close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `,this.contentElement=document.createElement("div"),this.contentElement.className="chatbot-content",this.contentElement.innerHTML='<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>';const s=document.createElement("div");s.className="chatbot-input",this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.placeholder="Введите сообщение...";const n=document.createElement("button");n.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,s.appendChild(this.inputElement),s.appendChild(n),t.appendChild(i),t.appendChild(this.contentElement),t.appendChild(s),this.container.appendChild(e),this.container.appendChild(t),document.body.appendChild(this.container),e.addEventListener("click",()=>this.toggle()),(a=i.querySelector(".chatbot-close"))==null||a.addEventListener("click",()=>this.toggle()),n.addEventListener("click",()=>this.sendMessage()),this.inputElement.addEventListener("keypress",c=>{c.key==="Enter"&&this.sendMessage()}),this.loadMessages()}loadMessages(){const e=localStorage.getItem("chatMessages");e&&(this.state.messages=JSON.parse(e).map(t=>((typeof t.timestamp=="string"||typeof t.timestamp=="number")&&(t.timestamp=new Date(t.timestamp)),t)),this.state.messages.forEach(t=>this.renderMessage(t)))}saveMessages(){localStorage.setItem("chatMessages",JSON.stringify(this.state.messages))}async sendMessage(){const e=this.inputElement.value.trim();if(!e)return;this.inputElement.value="";const t={id:Date.now().toString(),text:e,sender:"user",timestamp:new Date};this.state.messages.push(t),this.renderMessage(t),this.scrollToBottom(),this.state.isTyping=!0,this.renderTypingIndicator(),await new Promise(s=>setTimeout(s,1500+Math.random()*1e3)),this.state.isTyping=!1;const i=await this.fetchBotMessage(e);this.state.messages.push(i),this.removeTypingIndicator(),this.renderMessage(i),this.scrollToBottom(),this.saveMessages()}async fetchBotMessage(e){try{const t=await fetch(`http://localhost:8000/stream?query=${encodeURIComponent(e)}`,{method:"GET",headers:{accept:"application/json"}});if(!t.ok)throw new Error("Ошибка при получении данных от бота");const i=await t.json();return console.log(i),{id:Date.now().toString(),text:i.data||"Извините, в данный момент я не могу ответить на ваше сообщение.",sender:"bot",timestamp:new Date}}catch(t){return console.error("Ошибка при получении сообщения от бота:",t),{id:Date.now().toString(),text:"Что-то пошло не так. Попробуйте позже.",sender:"bot",timestamp:new Date}}}renderMessage(e){const t=document.createElement("div");t.className=`chatbot-message ${e.sender}`,t.innerHTML=`
      <div class="message-content">
        <p>${e.text}</p>
        <span class="message-time">${e.timestamp.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
    `,this.contentElement.appendChild(t)}renderTypingIndicator(){const e=document.createElement("div");e.className="chatbot-message bot typing",e.innerHTML=`
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,this.contentElement.appendChild(e),this.scrollToBottom()}removeTypingIndicator(){const e=this.contentElement.querySelector(".typing");e&&e.remove()}scrollToBottom(){this.contentElement.scrollTop=this.contentElement.scrollHeight}toggle(){this.isOpen=!this.isOpen,this.container.classList.toggle("open",this.isOpen)}}new h;
