# Desenvolvimento

O site continua estático e é publicado pelo workflow existente do GitHub Pages. A seção “This Is o Quil” é um componente React isolado; o restante da página não foi migrado.

Com Node.js 24 e npm disponíveis, execute na raiz do checkout:

```sh
npm ci
npm run build
python3 -m http.server 8000 --bind 127.0.0.1
```

Edite o texto e o comportamento em `src/Story.jsx`. `npm run build` pré-renderiza a narrativa entre os marcadores STORY de `index.html` e gera o bundle de produção em `assets/story.js`, com versão do conteúdo na URL. Inclua esses dois arquivos gerados no commit quando alterar o componente. O workflow de publicação atual serve esses arquivos já gerados e não precisa instalar Node no servidor.

Não edite manualmente o conteúdo entre os marcadores STORY. O CSS está em `assets/refinamentos.css`. `.build/` e `node_modules/` são locais e não devem entrar no Git.

O texto fica legível sem JavaScript. O componente React apenas destaca o parágrafo na área de leitura, usando IntersectionObserver. A preferência por movimento reduzido desativa esse efeito. O componente não controla a rolagem nem desloca o foco.
