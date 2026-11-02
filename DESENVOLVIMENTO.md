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

## Desempenho mobile

O build incorpora o CSS no HTML para remover uma requisição bloqueante. O arquivo `assets/site.css` também é gerado para inspeção. Ao incorporar, o build ajusta os caminhos das fontes para `assets/`. DM Sans é local, da distribuição `@fontsource-variable/dm-sans@5.3.0` (SIL OFL em `assets/dm-sans-OFL.txt`). Unbounded usa uma versão WOFF2 reduzida para Latin-1 e pontuação geral, preservando os pesos variáveis e a licença original.

As capas de lista usam `assets/thumbs/` (160×160), a capa da abertura usa `quase-indo-600.webp` (600×600), a assinatura usa WebP sem perdas com largura de 360 px e o retrato usa `o-quil-retrato-optimized.webp`. Os originais continuam disponíveis. Essas versões são arquivos versionados: não é necessário instalar ferramentas de imagem ou fontes para executar `npm ci`, build ou publicação. Ao substituir uma capa, atualize também sua miniatura.

A assinatura continua entrando depois do título e da capa, com traços mais rápidos. Em dispositivos touch, a moldura usa variação de opacidade para evitar repintar seu gradiente continuamente.

### Ajustes na Cloudflare (fora do código)

O relatório de 02/11/2026 mostrou cache de 4 horas e scripts injetados pela Cloudflare. Não há configuração desses serviços neste checkout.

- Criar uma Cache Rule para `/assets/`: respeitar a query string na chave do cache (o JavaScript usa `?v=`), com Edge TTL de 30 dias e Browser TTL de 1 dia. Não aplicar esse TTL ao HTML. Invalidar os caminhos de imagens/fontes ao substituí-los mantendo o mesmo nome.
- Se a medição de visitas não for necessária, desativar a injeção do Web Analytics/Browser Insights no painel para remover `beacon.min.js`, seus polyfills e chamadas RUM. Não existe alteração no bundle local que remova um script injetado pela CDN.
- A ofuscação de e-mail também injeta `email-decode.min.js`. Sua desativação é uma escolha de configuração da hospedagem.
- Após publicar, medir novamente no PageSpeed mobile. O servidor Python de desenvolvimento não fornece compressão ou cache de produção; avisos locais desses cabeçalhos não comprovam problemas na CDN.
