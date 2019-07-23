import { html, render } from 'lit-html';

const params = new URLSearchParams(document.location.search)

// Try hard to ignore all this, and look at the actual 
// loaded pages

const paths = {
  'dev.host': import('./dev.host'),
  'dev.join': import('./dev.join'),
  'zoom.host': import('./zoom.host'),
  'zoom.join': import('./zoom.join'),
}

const app = params.get('a');

if(app) {

  const action =  
    params.has("join") ? 'join' : 
    params.has("host") ? 'host' : '';

  const room = params.get(action);

  const path = paths[app + '.' + action];

  if(path) {
    path.then(imp => { imp.default(room)})
  }

  if(action === 'join') {
    document.querySelector('h1').style.display = 'none'
  }
}


const joinURL = document.location.href.replace('host=', 'join=')
const hostLink = (name: string) => html`
  <a href="?a=${name}&host=${Math.random().toString(32).split('.')[1]}">
    ${name}
  </a>
`

const nav = (params: URLSearchParams) => html`
  ${
    params.has('join') ? 
      html`<h2 id="appName">${params.get('a')}</h2>` :
    params.has('a') ? 
      html`
        <h2 id="appName">${params.get('a')}</h2>
        <footer>
          <a target="_blank" href="${joinURL}">${joinURL}</a>
        </footer>
      ` :
      html`
        <nav>
          ${hostLink('dev')}
          ${hostLink('zoom')}
          ${hostLink('draw')}
        </nav>
      `
  }  
`;

render(nav(params), document.querySelector('#join'));
