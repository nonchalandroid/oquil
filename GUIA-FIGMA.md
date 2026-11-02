# o Quil — alterações a aplicar ao arquivo Figma

Arquivo existente: https://www.figma.com/design/Xzy1Mw7KCYjFFcWizJSMM8

Nesta revisão o acesso à edição via Figma atingiu o limite de chamadas do plano Starter; as alterações abaixo **foram aplicadas ao HTML**, mas não ao arquivo Figma.

## Identidade do primeiro HTML

- Família de títulos: **Unbounded** (pesos 300, 400, 500, 600 e 700).
- Família de textos e interface: **Outfit** (pesos 300, 400, 500 e 600).
- Fundo: `#05090a`; texto: `#e8eee9`; verde-claro: `#83d9cb`.
- Botões retangulares e discretos, com **2px de raio**, borda fina, sem sombras de aplicativo.
- Espaçamento entre links igual e texto centralizado na altura dos botões.

## Imagens do artista (disponíveis em assets/)

1. `o-quil-retrato.webp`: foto original enviada. Aplicar como plano de fundo do hero, mantendo o texto do lado direito no desktop e abaixo no mobile.
2. `o-quil-assinatura-clara.png`: assinatura manuscrita enviada, com os mesmos traços e versão clara para leitura sobre fundo escuro. Colocar abaixo do título “Quase Indo” e usar pequena no rodapé.
3. `quase-indo-capa.webp`: capa original enviada. Aplicar na área de playlist e na primeira faixa do catálogo.

## Spotify e plataformas

- Manter a playlist oficial centralizada em sua coluna.
- Exibir, em cada lançamento, **Spotify / YouTube Music / YouTube** como links editoriais retangulares ou sublinhados, na mesma coluna que o título.
- O botão do Spotify é primário; YouTube Music e YouTube são secundários.
- URLs individuais não confirmadas permanecem **links de busca**; não apresentar como links diretos da faixa.

## Referência de implementação

O arquivo `index.html` deste pacote é a versão mais atual. O HTML original do artista foi mantido como base; as alterações estão no bloco `<style id="quil-editorial-refinements">` do `<head>`.

## Ajuste V7 — fotografia estática e rótulo de lançamento

- Sobre a abertura, acima de **QUASE INDO**, escrever **ÚLTIMO LANÇAMENTO** em caixa alta, Outfit Medium, cor verde-água; informação geográfica discreta ao lado.
- Manter película/grain como uma textura única estática: sem animação `grain`, `glitchDrift` ou `heroBreath`, sem parallax da foto.
- Preservar demais cores e dimensões do HTML original.
