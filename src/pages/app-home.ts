import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';

import { styles as sharedStyles } from '../styles/shared-styles';


@customElement('app-home')
export class AppHome extends LitElement {
  @property({ type: Array }) conversations = [];
  @property({ type: Array }) currentTasks=[];
  @property({ type: Array }) prompts: String[] = [];
  @property({ type: Boolean }) waiting = false;
  @property({ type: Object }) headers = {};

  static styles = [
    sharedStyles,
  ]

  handleClick() {
    const sidebar = this.renderRoot.querySelector('.sidebar');
    if (sidebar)
      sidebar.classList.toggle('show');
  }

  async firstUpdated() {
    var token = localStorage.getItem('token');
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    if (token == null) {
      window.location.href = 'login';
    }
    var token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/conversations', {
      headers: this.headers
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.conversations = data;
        var currentConversaionId = data[0][0]
        fetch(`http://localhost:8080/api/get_task?conversationId=${currentConversaionId}`, { headers: this.headers }).then(response => response.json())
        .then(data => {console.log(data);this.currentTasks=data});
        this.requestUpdate();
      })
      .catch(error => console.error(error));
  }

  async getTasksByConversationId(currentConversaionId:Number){
    console.log(currentConversaionId);
    fetch(`http://localhost:8080/api/get_task?conversationId=${currentConversaionId}`, { headers: this.headers }).then(response => response.json())
    .then(data => {console.log(data);this.currentTasks=data});
    this.requestUpdate();
    this.handleClick();
  }


  async handleSend() {
    const input = this.renderRoot.querySelector('sl-textarea');
    if (input && input.value == '') return;
    if (input) {
      const message = input.value;
      input.value = '';
      const button = this.renderRoot.querySelector('#send');
      if (button) {
        button.setAttribute('disabled','');
        this.prompts = [...this.prompts, message];
        this.waiting = true;
      }
      var token = localStorage.getItem('token');
      const taskdata = { 'conversationId': this.conversations[0], 'prompt': message };
      fetch('http://localhost:8080/api/create_task', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method:'POST',
        body: JSON.stringify(taskdata)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.conversations = data;
          this.requestUpdate();
        })
        .catch(error => console.error(error));
    }
  }

  render() {
    return html`
      <button class="sidebar-toggle" aria-label="Menu" @click="${this.handleClick}">
        <div class="sidebar-toggle-button"><sl-button pill size="small">></sl-button></div>
      </button>
      <aside class="sidebar">
        <div class="sidebar-nav">
          <ul>
          ${this.conversations.map(conversation => html`<li @click='${()=>this.getTasksByConversationId(conversation[0])}'>${conversation[0]} ${conversation[1]}</li>`)}
          </ul>
        </div>
      </aside>
      <section class="content">
        <div class='scroll'>
        ${this.prompts.map((prompt) => html`
          <div class="prompt">
            <sl-card>
              <sl-card-body>${prompt}</sl-card-body>
            </sl-card>
          </div>
          <div>
          <sl-card><sl-spinner></sl-spinner></sl-card>
            </div>
        `)}  </div>
      </section>
      <footer >
            <sl-textarea rows="3" placeholder="Type a message..." filled spellcheck="false"></sl-textarea>
            <sl-button id='send' variant="primary" pill @click="${this.handleSend}">Send</sl-button>
        </footer>
    `;
  }
}