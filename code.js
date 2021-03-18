import { registerSW, pickRandom, fetchGitHubAPI, delay } from './shared.js';

registerSW();

const container = document.getElementById('container');
let resultingText = '';

const owners = [
  '/users/Benjamin-Davies',
  '/orgs/stemwana-youthdev',
  '/orgs/microsoft',
];

let charDelay = 100;
window.addEventListener('keypress', (ev) => {
  switch (ev.key) {
    case '>':
      charDelay /= Math.SQRT2;
      break;
    case '<':
      charDelay *= Math.SQRT2;
      if (charDelay > 3200) charDelay = 3200;
      break;
  }
  console.log('Char delay:', charDelay);
});

/**
 * @param {string} text
 */
async function print(text) {
  for (const char of text) {
    if (char.charCodeAt(0) & 0x80) {
      return;
    }

    resultingText += char;
    container.innerText = resultingText;
    await delay(charDelay);
  }
}

/**
 * @param {string} text
 */
function shellEscape(text) {
  return text.replace(/\s/g, '\\ ');
}

async function run() {
  const owner = pickRandom(owners);
  await print(
    `$ git clone https://github.com/${owner.slice(owner.lastIndexOf('/') + 1)}/`
  );

  const repos = await fetchGitHubAPI(owner + '/repos');
  const repo = pickRandom(repos);
  await print(`${repo.name}.git\nCloning into '${repo.name}'...\n`);

  while (true) {
    await print(`$ cat ${shellEscape(repo.name)}`);
    let url = repo.trees_url.replace('{/sha}', '/' + repo.default_branch);
    let child;
    while (child?.type !== 'blob') {
      const tree = await fetchGitHubAPI(url);
      child = pickRandom(tree.tree);
      url = child.url;
      await print(`/${shellEscape(child.path)}`);
    }
    child = await fetchGitHubAPI(url);
    await print('\n');

    const text = atob(child.content);
    await print(text);
  }
}

run();
