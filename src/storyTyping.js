export const biography = "Eu sou o Quil. Minha história com a música começou há alguns anos, entre o rap, o trap e o R&B. Desde o início, sempre tive mais interesse em transformar o que vivia em música do que em seguir um caminho pronto.\n\nAo longo do tempo, lancei trabalhos, construí meu próprio catálogo e vivi fases muito diferentes. Também vieram períodos em que precisei me afastar. A vida aconteceu fora da música: mudanças, perdas, questões pessoais e responsabilidades que acabaram tomando o espaço que antes eu dedicava a criar.\n\nDepois de cerca de quatro anos longe dos lançamentos, voltei em 2026. Voltei fazendo do meu jeito: compondo, produzindo, gravando, mixando e cuidando de cada detalhe. Saíram “Consequência de Estar Acordado”, “TAG”, “Se Move” e “Quase Indo”. Foi uma forma de reencontrar esse lugar e mostrar que o projeto ainda estava aqui.\n\nHoje, a música divide espaço com outras responsabilidades. Nem sempre consigo manter o ritmo que gostaria, e às vezes preciso parar para cuidar da vida que acontece ao redor dela. Mas não considero esses intervalos um ponto final. O Quil carrega todas essas fases, inclusive as que ainda estão por vir.";

// Uma letra por passo, sem erros simulados e com pausas curtas na pontuação.
export function createTypingSteps() {
  return Array.from(biography, (char, index) => ({
    text: biography.slice(0, index + 1),
    delay: char === '\n' ? 100 : /[.,]/.test(char) ? 90 : 18
  }));
}
