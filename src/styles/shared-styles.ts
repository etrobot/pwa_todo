import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const styles = css`
  @media(min-width: 1000px) {
    sl-card {
      max-width: 70vw;
    }
  }

  main {
    margin-top: 80px;
  }

  .show {
        display:None;
      }
      .sidebar {
  background-color:var(--sl-panel-background-color);
  border-right: 1px solid rgba(0,0,0,0.07);
  overflow-y: auto;
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
  background-color: transparent;
  background-color: rgba(255,255,255,0.8);
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
  background-color: #000;
  background-color: var(--theme-color, #000);
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
    padding-top: 60px;
    position: absolute;
    top: 0;
    right: 20px;
    bottom: 0;
    left: 320px;
}
footer {
    width:100%;
    position: absolute;
    bottom: 6px;
}
footer sl-button{
  padding:0.5rem;
  width:100%
}

@media screen and (max-width: 768px) {
        .content{
          left:10px;
        }
        .sidebar {
          display:none;
        }
        .show {
          display:block;
        }
        footer{
          width:100%;
        }
      }
`;