export const biography = 'o Quil começou na música usando seu nome de batismo, fillipe queiroz. do rio de janeiro, veio do rap e da produção musical.\n\nmais tarde, passou a assinar como o Quil. independente, ele mesmo grava, produz suas músicas e cuida de cada etapa do trabalho.\n\nhoje, o dark r&b faz parte dessa história. músicas sobre conflitos e seguir em frente, entre atmosferas noturnas, espaço e emoção.';

// Sorteia um erro por trecho, sempre numa letra intermediária da palavra.
export function createTypingSteps(random = Math.random) {
  const words = [...biography.matchAll(/\p{L}{5,}/gu)];
  const mistakes = new Map();
  for (let group = 0; group < 3; group++) {
    const candidates = words.filter(word => Math.floor(word.index / biography.length * 3) === group);
    if (!candidates.length) continue;
    const word = candidates[Math.floor(random() * candidates.length)];
    const position = word.index + 1 + Math.floor(random() * (word[0].length - 2));
    const letters = 'abcdefghijklmnopqrstuvwxyz'.replace(biography[position], '');
    mistakes.set(position, letters[Math.floor(random() * letters.length)]);
  }
  const steps = [];
  for (let i = 0; i < biography.length; i++) {
    const prefix = biography.slice(0, i);
    if (mistakes.has(i)) {
      steps.push({ text: prefix + mistakes.get(i), delay: 550 });
      steps.push({ text: prefix, delay: 130 });
    }
    const char = biography[i];
    steps.push({ text: prefix + char, delay: char === '\n' ? 550 : /[.,]/.test(char) ? 420 : 85 + Math.floor(random() * 65) });
  }
  return steps;
}
