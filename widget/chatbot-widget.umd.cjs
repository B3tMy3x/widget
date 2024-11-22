(function(s,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(s=typeof globalThis<"u"?globalThis:s||self,s.ChatbotWidget=e())})(this,function(){"use strict";var d=Object.defineProperty;var h=(s,e,t)=>e in s?d(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>h(s,typeof e!="symbol"?e+"":e,t);class s{constructor(){a(this,"container");a(this,"contentElement");a(this,"inputElement");a(this,"state",{messages:[],isTyping:!1});a(this,"isOpen",!1);this.container=document.createElement("div"),this.container.className="chatbot-widget",this.init()}init(){var l;const t=document.createElement("button");t.className="chatbot-toggle",t.innerHTML=`
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
    `,this.contentElement=document.createElement("div"),this.contentElement.className="chatbot-content",this.contentElement.innerHTML='<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>';const o=document.createElement("div");o.className="chatbot-input",this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.placeholder="Введите сообщение...";const c=document.createElement("button");c.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,o.appendChild(this.inputElement),o.appendChild(c),n.appendChild(i),n.appendChild(this.contentElement),n.appendChild(o),this.container.appendChild(t),this.container.appendChild(n),document.body.appendChild(this.container),t.addEventListener("click",()=>this.toggle()),(l=i.querySelector(".chatbot-close"))==null||l.addEventListener("click",()=>this.toggle()),c.addEventListener("click",()=>this.sendMessage()),this.inputElement.addEventListener("keypress",r=>{r.key==="Enter"&&this.sendMessage()})}async sendMessage(){const t=this.inputElement.value.trim();if(!t)return;this.inputElement.value="";const n={id:Date.now().toString(),text:t,sender:"user",timestamp:new Date};this.state.messages.push(n),this.renderMessage(n),this.scrollToBottom(),this.state.isTyping=!0,this.renderTypingIndicator(),await new Promise(o=>setTimeout(o,1500+Math.random()*1e3)),this.state.isTyping=!1;const i={id:(Date.now()+1).toString(),text:"Извините, в данный момент я не могу ответить на ваше сообщение.",sender:"bot",timestamp:new Date};this.state.messages.push(i),this.removeTypingIndicator(),this.renderMessage(i),this.scrollToBottom()}renderMessage(t){const n=document.createElement("div");n.className=`chatbot-message ${t.sender}`,n.innerHTML=`
      <div class="message-content">
        <p>${t.text}</p>
        <span class="message-time">${t.timestamp.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
    `,this.contentElement.appendChild(n)}renderTypingIndicator(){const t=document.createElement("div");t.className="chatbot-message bot typing",t.innerHTML=`
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,this.contentElement.appendChild(t),this.scrollToBottom()}removeTypingIndicator(){const t=this.contentElement.querySelector(".typing");t&&t.remove()}scrollToBottom(){this.contentElement.scrollTop=this.contentElement.scrollHeight}toggle(){this.isOpen=!this.isOpen,this.container.classList.toggle("open",this.isOpen)}}return s});
