var l=Object.defineProperty;var d=(o,e,n)=>e in o?l(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n;var c=(o,e,n)=>d(o,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();class h{constructor(){c(this,"container");c(this,"contentElement");c(this,"inputElement");c(this,"state",{messages:[],isTyping:!1});c(this,"isOpen",!1);this.container=document.createElement("div"),this.container.className="chatbot-widget",this.init()}init(){var r;const e=document.createElement("button");e.className="chatbot-toggle",e.innerHTML=`
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
    `;const n=document.createElement("div");n.className="chatbot-container";const i=document.createElement("div");i.className="chatbot-header",i.innerHTML=`
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
    `,this.contentElement=document.createElement("div"),this.contentElement.className="chatbot-content",this.contentElement.innerHTML='<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>';const t=document.createElement("div");t.className="chatbot-input",this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.placeholder="Введите сообщение...";const s=document.createElement("button");s.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,t.appendChild(this.inputElement),t.appendChild(s),n.appendChild(i),n.appendChild(this.contentElement),n.appendChild(t),this.container.appendChild(e),this.container.appendChild(n),document.body.appendChild(this.container),e.addEventListener("click",()=>this.toggle()),(r=i.querySelector(".chatbot-close"))==null||r.addEventListener("click",()=>this.toggle()),s.addEventListener("click",()=>this.sendMessage()),this.inputElement.addEventListener("keypress",a=>{a.key==="Enter"&&this.sendMessage()})}async sendMessage(){const e=this.inputElement.value.trim();if(!e)return;this.inputElement.value="";const n={id:Date.now().toString(),text:e,sender:"user",timestamp:new Date};this.state.messages.push(n),this.renderMessage(n),this.scrollToBottom(),this.state.isTyping=!0,this.renderTypingIndicator(),await new Promise(t=>setTimeout(t,1500+Math.random()*1e3)),this.state.isTyping=!1;const i={id:(Date.now()+1).toString(),text:"Извините, в данный момент я не могу ответить на ваше сообщение.",sender:"bot",timestamp:new Date};this.state.messages.push(i),this.removeTypingIndicator(),this.renderMessage(i),this.scrollToBottom()}renderMessage(e){const n=document.createElement("div");n.className=`chatbot-message ${e.sender}`,n.innerHTML=`
      <div class="message-content">
        <p>${e.text}</p>
        <span class="message-time">${e.timestamp.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
    `,this.contentElement.appendChild(n)}renderTypingIndicator(){const e=document.createElement("div");e.className="chatbot-message bot typing",e.innerHTML=`
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,this.contentElement.appendChild(e),this.scrollToBottom()}removeTypingIndicator(){const e=this.contentElement.querySelector(".typing");e&&e.remove()}scrollToBottom(){this.contentElement.scrollTop=this.contentElement.scrollHeight}toggle(){this.isOpen=!this.isOpen,this.container.classList.toggle("open",this.isOpen)}}new h;
