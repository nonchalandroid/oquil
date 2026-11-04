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

O Q mantém a referência manuscrita, com curvas Bézier e terminais arredondados. O master vetorial está em `src/brand/q-icon.svg`; `assets/favicon.svg` é sua cópia pública, sem imagem raster embutida. Para regenerar os ícones, execute `python3 scripts/generate-icons.py` com Pillow e CairoSVG instalados e depois `npm run build`. Não é uma dependência da aplicação ou da publicação: os ícones finais ficam versionados.

São gerados PNGs de 16 a 1024 px com cantos arredondados, ICO com sete resoluções, Apple Touch opacos de 120/152/167/180 px e variantes Android maskable com fundo completo e símbolo dentro do círculo seguro de 80% do diâmetro. iOS e Android aplicam suas próprias máscaras aos atalhos. `site.webmanifest` e `browserconfig.xml` acompanham a publicação. O HTML dá preferência ao SVG nos navegadores compatíveis e mantém ICO/PNG como alternativas. As URLs de ícone têm versão por conteúdo, inclusive dentro de `dist/site.webmanifest` e `dist/browserconfig.xml`; caches de abas, favoritos e itens já salvos podem ser renovados em momentos diferentes por cada navegador.

Na biografia, o texto completo permanece no HTML e na árvore de acessibilidade. A camada visual de digitação é ativada só com JavaScript e sem preferência por movimento reduzido. Ao descer, a digitação avança; ao subir, apaga em ordem inversa. Apenas um parágrafo fica parcialmente digitado por vez, sem interceptar a roda do mouse. O controle “Ler sem animação” revela todo o texto.

## Desempenho mobile

O build incorpora o CSS no HTML para remover uma requisição bloqueante. O arquivo `assets/site.css` também é gerado para inspeção. Ao incorporar, o build ajusta os caminhos das fontes para `assets/`. DM Sans é local, da distribuição `@fontsource-variable/dm-sans@5.3.0` (SIL OFL em `assets/dm-sans-OFL.txt`). Unbounded usa uma versão WOFF2 reduzida para Latin-1 e pontuação geral, preservando os pesos variáveis e a licença original.

As capas de lista usam `assets/thumbs/` (160×160), a capa da abertura usa `srcset` com versões de 400/600/800 px, a assinatura estática usa WebP de 180 px e o retrato usa `o-quil-retrato-optimized.webp`. Os originais continuam disponíveis. Essas versões são arquivos versionados: não é necessário instalar ferramentas de imagem ou fontes para executar `npm ci`, build ou publicação. Ao substituir uma capa, atualize também sua miniatura.

A assinatura continua entrando depois do título e da capa. A escrita usa uma faixa WebP transparente de 32 quadros (240×108 por quadro), animada por `transform` com `steps`, preservando os traços originais sem animar `stroke-dashoffset`. A duração é 1.302 ms, após uma espera de 1.300 ms. A versão estática garante acessibilidade e movimento reduzido. O gerador opcional `node scripts/generate-signature.cjs` requer Sharp e recompõe a sequência, a assinatura estática e as capas responsivas; os comprimentos dos traços estão em `scripts/signature-path-lengths.json`. Em dispositivos touch, a moldura usa variação de opacidade para evitar repintar seu gradiente continuamente.

### Ajustes na Cloudflare (fora do código)

O relatório de 02/11/2026 mostrou cache de 4 horas e scripts injetados pela Cloudflare. Não há configuração desses serviços neste checkout.

- Criar uma Cache Rule para `/assets/`: respeitar a query string na chave do cache (o JavaScript usa `?v=`), com Edge TTL de 30 dias e Browser TTL de 1 dia. Não aplicar esse TTL ao HTML. Invalidar os caminhos de imagens/fontes ao substituí-los mantendo o mesmo nome.
- Se a medição de visitas não for necessária, desativar a injeção do Web Analytics/Browser Insights no painel para remover `beacon.min.js`, seus polyfills e chamadas RUM. Não existe alteração no bundle local que remova um script injetado pela CDN.
- A ofuscação de e-mail também injeta `email-decode.min.js`. Sua desativação é uma escolha de configuração da hospedagem.
- Após publicar, medir novamente no PageSpeed mobile. O servidor Python de desenvolvimento não fornece compressão ou cache de produção; avisos locais desses cabeçalhos não comprovam problemas na CDN.

### Avisos restantes após a nota 100 em produção

O relatório enviado em 02/11/2026 não exige remover animações. A escrita foi migrada para quadros compostos por `transform`; a auditoria local final não listou animações não compostas e manteve CLS 0. A economia estimada restante de imagens caiu de cerca de 20 KiB para 5 KiB no teste local. Esses resultados locais não substituem nova medição no domínio publicado.

O diagnóstico de JavaScript não usado inclui partes de React/React DOM que não são executadas no carregamento inicial, mas dão suporte à hidratação e às interações. Remover funções do bundle manualmente não é uma correção segura. Sua redução adicional exigiria reorganizar a arquitetura de hidratação; não foi removida funcionalidade para silenciar o diagnóstico. Cache e scripts injetados pela Cloudflare continuam dependendo das configurações de hospedagem descritas acima.

### Digitação da biografia

A bio usa fontes nativas do sistema (`-apple-system`, BlinkMacSystemFont e equivalentes), sem download adicional. A descida da página libera progressivamente o texto, digitado sem erros simulados a 18 ms por letra, com pausas curtas na pontuação. Ao subir, o texto apaga com backspace proporcional à distância rolada; ao descer novamente, retoma do prefixo existente.

`src/storyTyping.js` mantém apenas passos do texto correto. “Ler sem animação” e a preferência por movimento reduzido apresentam imediatamente a bio completa; o HTML pré-renderizado e leitores de tela mantêm o texto final correto.

### Estabilidade da rolagem mobile

A barra de leitura atualiza somente seu próprio `transform`, em vez de uma variável CSS herdada do documento inteiro. A bio agrupa leituras de rolagem em `requestAnimationFrame`, ignora oscilações acumuladas menores que 3 px e mantém a altura de referência quando a barra do navegador touch recolhe ou expande. O controle de leitura reserva espaço e não altera a posição das seções ao desaparecer. O fundo dos botões “Ouvir” no touch preserva o visual sem `backdrop-filter` durante a rolagem.

A assinatura, a flutuação da capa, o brilho, as entradas das seções e a digitação/backspace foram preservados. Na simulação Chromium mobile, a mesma sequência de descida/subida reduziu o tempo de recálculo de estilos de aproximadamente 1,26 s para 0,15 s. A auditoria local registrou CLS 0 e nenhum aviso de animação não composta. Esse teste não substitui conferir um aparelho físico, especialmente Safari/iOS.

Em 04/11/2026 foi removida do PRESS a matéria legada `noisey.vice.com/pt_br/blog/ouca-sinergia-primeiro-ep-do-carioca-fillipe-queiroz`, confirmada como quebrada pelo responsável pelo site. Os demais destinos foram preservados: o proxy do ambiente bloqueou as consultas externas e não permitiu confirmar sua disponibilidade.
