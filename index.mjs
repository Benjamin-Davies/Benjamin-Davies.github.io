const CHAR_PER_SECOND = 30;

const content = document.getElementById('content');

/**@type {Node[]} */
const textNodes = [];
/**@type {HTMLImageElement | null} */
let image = null;
let imageNodeIndex = 0;
function collectTextNodes(/**@type {Node} */ node) {
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  } else if (node.nodeName === 'IMG') {
    image = node;
    imageNodeIndex = textNodes.length;
    image.classList.add('hide');
  } else {
    for (const child of node.childNodes) {
      collectTextNodes(child);
    }
  }
}
collectTextNodes(content);

const texts = textNodes.map((n) => n.textContent);
for (const node of textNodes) {
  node.textContent = '';
}

content.classList.remove('hide');

let nodeIndex = 0;
let charIndex = 0;
const interval = setInterval(() => {
  if (texts[nodeIndex] === undefined) {
    clearInterval(interval);
    return;
  }
  while (charIndex >= texts[nodeIndex].length) {
    nodeIndex++;
    charIndex = 0;

    if (texts[nodeIndex] === undefined) {
      return;
    }
    if (nodeIndex === imageNodeIndex) {
      image.classList.remove('hide');
    }
  }
  charIndex++;

  textNodes[nodeIndex].textContent = texts[nodeIndex].slice(0, charIndex);
}, 1000 / CHAR_PER_SECOND);
