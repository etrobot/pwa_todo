import { css } from 'lit';


// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const styles = css`

html, body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
}

  @media(min-width: 1000px) {
    sl-card {
      max-width: 70vw;
    }
  }

  .show {
        display:None;
      }
  .sidebar {
  background-color:var(--sl-color-neutral-0);
  border-right: 1px solid rgba(0,0,0,0.07);
  padding: 40px 0 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  transition: transform 250ms ease-out;
  width: 300px;
  z-index: 20;
}
.sidebar > h1 {
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
}
.sidebar > h1 a {
  color: inherit;
  text-decoration: none;
}
.sidebar > h1 .app-nav {
  display: block;
  position: static;
}
.sidebar .sidebar-nav {
  line-height: 2em;
  padding-bottom: 40px;
}
.sidebar li.collapse .app-sub-sidebar {
  display: none;
}
.sidebar ul {
  margin: 0 0 0 15px;
  padding: 0;
}
.sidebar li > p {
  font-weight: 700;
  margin: 0;
}
.sidebar-nav a {
    color: inherit;
    text-decoration: none;
    line-height: 1.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
}
.sidebar ul,
.sidebar ul li {
  list-style: none;
}
.sidebar ul li a {
  border-bottom: none;
  display: block;
}
.sidebar ul li ul {
  padding-left: 20px;
}
.sidebar::-webkit-scrollbar {
  width: 4px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
.sidebar:hover::-webkit-scrollbar-thumb {
  background: rgba(136,136,136,0.4);
}
.sidebar:hover::-webkit-scrollbar-track {
  background: rgba(136,136,136,0.1);
}
.sidebar-toggle {
  background-color:inherit;
  border: 0;
  outline: none;
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  transition: opacity 0.3s;
  z-index: 30;
  cursor: pointer;
}
.sidebar-toggle:hover .sidebar-toggle-button {
  opacity: 0.4;
}
.sidebar-toggle span {
  display: block;
  margin-bottom: 4px;
  width: 16px;
  height: 2px;
}
body.sticky .sidebar,
body.sticky .sidebar-toggle {
  position: fixed;
}
.content {
  width:calc(100% - 320px);
    padding-right:10px;
    align-items:bottom;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 160px;
    overflow-y:hidden
}
footer {
  background-color:var(--sl-color-neutral-0);
  padding:10px;
  right:0;
  width:calc(100% - 320px);
    display: block;
    position: absolute;
    bottom: 0;
}
footer sl-button{
  padding:0.5rem;
  width:100%;
  align-items: flex-end;
}

.prompt {
  text-align:right;
  align-items:right
}

div{
  margin-top:5px;
}

.sidebar, .content {
  overflow-y: scroll;
}

@media screen and (max-width: 768px) {
        .content{
          width:calc(100% - 20px);
          left:10px;
        }
        .sidebar {
          display:none;
        }
        .show {
          display:block;
        }
        footer{
          width:calc(100% - 20px);
        }
      }
`;