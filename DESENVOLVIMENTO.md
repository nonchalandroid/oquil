# Desenvolvimento

Toda a interface é React, pré-renderizada como HTML estático e hidratada no navegador. Sem roteador, servidor de aplicação ou CDN JavaScript. O site continua compatível com GitHub Pages.

Na raiz do checkout, com Node.js 24 e npm:

```sh
npm ci
npm run build
npm run check
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

- `src/App.jsx`: estrutura da página, abertura, imprensa, navegação e rodapé.
- `src/Story.jsx`: narrativa com digitação visual progressiva conforme a rolagem.
- `src/Catalog.jsx`: singles e arquivo do catálogo.
- `src/Streaming.jsx`: objeto de capa clicável, diagrama de acordeões e faixa de plataformas.
- `src/content.json`: links, textos, imagens e plataformas existentes. Endereços de busca ou canal não equivalem a links diretos confirmados.
- `src/Icons.jsx` e `src/brand-paths.json`: ícones SVG locais. Os símbolos de marca são definidos uma única vez.
- `src/usePageEffects.js`: progresso de leitura, entradas discretas e tecla Escape. Eventos e observadores são removidos ao desmontar; movimento reduzido respeitado.
- `src/site.css`: único CSS de origem. Subtítulos em Unbounded, peso 400. O h1 mantém Unbounded, peso 600.
- `src/document.html`: metadados SEO, dados estruturados e documento base.

`npm run build` gera `index.html`, `assets/app.js`, `assets/site.css` e a pasta pública `dist/`. Edite os arquivos de origem, não os gerados. Os bundles têm versão baseada em conteúdo nas URLs para renovação do cache. Os arquivos gerados na raiz permanecem versionados para revisão; `dist/`, `.build/` e `node_modules/` são ignorados.

O workflow `.github/workflows/static.yml` instala com `npm ci`, executa build e verificações e publica somente `dist/`. Código-fonte e node_modules não entram no artefato publicado.

`npm run check` confere arquivos locais, IDs únicos, destinos de âncoras, formato HTTPS dos links externos, h1, narrativa pré-renderizada e JSON estruturado. A verificação não afirma disponibilidade ou conteúdo de serviços externos.

O conteúdo é legível sem JavaScript. Acordeões usam details/summary nativos e funcionam por teclado sem hidratação. Não há ocultação de conteúdo condicionada à rolagem nem interceptação das âncoras. `#top` aponta a um marcador dedicado no início do documento.

## Favicon

O Q foi adaptado da assinatura do artista para manter legibilidade em tamanho pequeno. O master está em `src/brand/q-assinatura-master.png`. Para regenerar os ícones, execute `python3 scripts/generate-icons.py` com Pillow instalado e depois `npm run build`. Não é uma dependência da aplicação ou da publicação: os ícones finais ficam versionados.

São gerados PNGs de 16 a 1024 px, ICO com sete resoluções, Apple Touch e variantes maskable com margem de segurança. `site.webmanifest` e `browserconfig.xml` acompanham a publicação. As URLs de ícone têm versão por conteúdo; caches de abas, favoritos e itens já salvos podem ser renovados em momentos diferentes por cada navegador.

Na biografia, o texto completo permanece no HTML e na árvore de acessibilidade. A camada visual de digitação é ativada só com JavaScript e sem preferência por movimento reduzido. Ao descer, a digitação avança; ao subir, apaga em ordem inversa. Apenas um parágrafo fica parcialmente digitado por vez, sem interceptar a roda do mouse. O controle “Ler sem animação” revela todo o texto.
