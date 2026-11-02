export const biography = 'o Quil começou na música usando seu nome de batismo, fillipe queiroz. do rio de janeiro, veio do rap e da produção musical.\n\nmais tarde, passou a assinar como o Quil. independente, ele mesmo grava, produz suas músicas e cuida de cada etapa do trabalho.\n\nhoje, o dark r&b faz parte dessa história. músicas sobre conflitos e seguir em frente, entre atmosferas noturnas, espaço e emoção.';

// Os três parágrafos continuam no mesmo bloco, com os mesmos espaços reservados.
export const passages = biography.split('\n\n').map((text, index, all) => {
  const start = all.slice(0, index).reduce((length, passage) => length + passage.length + 2, 0);
  return { text, start, end: start + text.length };
});

export function activePassage({ top, height }, viewportHeight) {
  const distance = viewportHeight * .78 - top;
  if (distance < 0) return -1;
  // Cada trecho exige mais rolagem, mesmo quando a bio inteira cabe na tela.
  const step = Math.max(height / passages.length, viewportHeight * .22);
  return Math.min(passages.length - 1, Math.floor(distance / step));
}

export function typingDelay(char) {
  return /[.,]/.test(char) ? 100 : 14;
}
