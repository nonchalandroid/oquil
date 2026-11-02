export const biography = 'o Quil começou na música usando seu nome de batismo, fillipe queiroz. do rio de janeiro, veio do rap e da produção musical.\n\nmais tarde, passou a assinar como o Quil. independente, ele mesmo grava, produz suas músicas e cuida de cada etapa do trabalho.\n\nhoje, o dark r&b faz parte dessa história. músicas sobre conflitos e seguir em frente, entre atmosferas noturnas, espaço e emoção.';

// Uma letra por passo, sem erros simulados e com pausas curtas na pontuação.
export function createTypingSteps() {
  return Array.from(biography, (char, index) => ({
    text: biography.slice(0, index + 1),
    delay: char === '\n' ? 100 : /[.,]/.test(char) ? 90 : 18
  }));
}
