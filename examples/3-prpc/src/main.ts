import { html, render } from 'lit-html';

const params = new URLSearchParams(document.location.search)

// // an app is selected
// if(params.has('a')) {
//   // remove the nav options
//   document.querySelector('#hostable').remove()

//   const joinURL = document.location.href.replace('host=', 'join=')

//   document.querySelector('footer').appendChild(Object.assign(
//     document.createElement('a'), {
//       target: '_blank',
//       href: joinURL,
//       innerText: joinURL
//     }
//   ));

//   // ?join=foo
//   if(params.has("join")) {
//     join(params.get("join"))
//   } else if(params.has("host"))  {

//     // host foo
//     host(params.get("host"))
//   }

// } else {

//   // add host= to each of the apps
//   Array.from(
//     document.querySelectorAll<HTMLAnchorElement>('#hostable a')
//   ).forEach(a => {
//     const url = new URL(a.href)
    
//     url.searchParams.append('host', Math.random().toString(32).split('.')[1])
  
//     a.href = url.toString();
//   })
// }


const joinURL = document.location.href.replace('host=', 'join=')
const hostLink = (name: string) => html`
  <a href="?a=${name}&host=${Math.random().toString(32).split('.')[1]}">
    ${name}
  </a>
`

const nav = (params: URLSearchParams) => html`
  ${
    params.has('a') ? 
      html`
        <h2 id="appName">${params.get('a')}</h2>
        <footer>
          <a href="${joinURL}">${joinURL}</a>
        </footer>
      ` :
      html`
        <nav>
          ${hostLink('demo')}
          ${hostLink('zoom')}
          ${hostLink('draw')}
        </nav>
      `
  }  
`;

render(nav(params), document.querySelector('#join'));
