import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';

import { styles as sharedStyles } from '../styles/shared-styles';

interface Task {
  id: number;
  conversationId: string;
  createTime: string;
  accountId: number;
  prompt: string;
  resultUrl: string;
  msgId: string;
  oriMsgId: string;
  msgType: string;
  updateTime: string;
  remark: string;
}


@customElement('app-home')
export class AppHome extends LitElement {
  @property({ type: Array }) conversations = [];
  @property({ type: Array }) currentTasks:Task[] = [{
    id: 1,
    conversationId: '1',
    createTime: '',
    accountId: 666,
    prompt: 'dddddddddd',
    resultUrl: 'etrobot_street_fighter_gamepixel_style_ken_vs_cammy_in_a_chines_e85aa6d2-055e-4bd2-9ec7-3834fde4910f.png',
    msgId: '77777777',
    oriMsgId: '',
    msgType: '',
    updateTime: '',
    remark: ''

  }];
  @property({ type: Number }) currentPage = -1;
  @property({ type: Array }) prompts: String[] = [];
  @property({ type: Boolean }) waiting = false;
  @property({ type: Object }) headers = {};

  static styles = [
    sharedStyles,
  ]

  async firstUpdated() {
    var token = localStorage.getItem('token');
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    if (token == null) {
      window.location.href = 'login';
    }
    await this.getConverstions();
  }

  handleClick() {
    const sidebar = this.renderRoot.querySelector('.sidebar');
    if (sidebar)
      sidebar.classList.toggle('show');
  }

  async getConverstions() {
    fetch('http://192.168.1.4:8080/api/conversations', {
      headers: this.headers
    })
      .then(response => response.json())
      .then(data => {
        this.conversations = data;
        var currentPageId = window.location.pathname.split('/').pop();
        if(currentPageId)this.getTasksByConversationId(parseInt(currentPageId))
      })
      .catch(error => console.error(error));
  }

  async getTasksByConversationId(currentConversaionId: Number) {
    if (currentConversaionId == -1) {
      currentConversaionId = this.conversations[0][0];
    }
    fetch(`http://192.168.1.4:8080/api/get_task?conversationId=${currentConversaionId}`, { headers: this.headers }).then(response => response.json())
      .then(data => { console.log(data); this.currentTasks = data });
    this.requestUpdate()
  }

  async addPrefix(e:Event){
    const input = this.renderRoot.querySelector('sl-textarea');
    if(input)input.value=(e.target as Element).textContent!+' '+input.value
  }

  async handleSend() {
    const input = this.renderRoot.querySelector('sl-textarea');
    if (input && (input.value == '' || input.value.charAt(0) != '/')) return;
    if (input) {
      const message = input.value;
      input.value = '';
      const button = this.renderRoot.querySelector('#send');
      if (button) {
        button.setAttribute('disabled', '');
        this.prompts = [...this.prompts, message];
        this.waiting = true;
      }
      var token = localStorage.getItem('token');
      const taskdata = { 'conversationId': this.conversations[0][0], 'prompt': message };
      fetch('http://192.168.1.4:8080/api/create_task', {
        headers: this.headers,
        method: 'POST',
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

  async optImg(e: Event){
    const buttonText =  (e.target as Element).textContent!;
    const msgId=(e.target as Element).getAttribute('Key')!;
    console.log(msgId+buttonText)
    fetch('http://192.168.1.4:8080/api/create_task', {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({'msgId':msgId,'opt':buttonText})
      })
        .then(response => response.json())
  }

  render() {
    return html`
      <button class="sidebar-toggle" aria-label="Menu" @click="${this.handleClick}">
        <div class="sidebar-toggle-button"><sl-button size="small">></sl-button></div>
      </button>
      <aside class="sidebar">
        <div class="sidebar-nav">
          <ul>
          ${this.conversations.map(conversation => html`<li><a .href='${conversation[0]}'>${conversation[0]} ${conversation[1]}</a></li>`)}
          </ul>
        </div>
      </aside>
      <section class="content">
        <div class='scroll'>
        ${this.currentTasks.map((task) => html`
          <div class="task">
          <sl-card class="card-basic">
          <img
            slot="image"
            .src="${task.resultUrl}"
          /><div>${task.prompt}</div>
          <div>
          <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>U1</sl-button>
          <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>U2</sl-button>
          <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>U3</sl-button>
          <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>U4</sl-button>
            <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>🔄</sl-button>
          </div>
            <div>
            <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>V1</sl-button>
          <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>V2</sl-button>
          <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>V3</sl-button>
          <sl-button size="small" @click="${this.optImg}" key='${task.msgId}'>V4</sl-button>
        </div>
        </sl-card>
            </div>
        `)}
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
            <div>
            <sl-button pill @click="${this.addPrefix}">/imagine</sl-button>
            <sl-button variant="primary" pill id='send' @click="${this.handleSend}" >Send</sl-button>
            </div>
        </footer>
    `;
  }
}