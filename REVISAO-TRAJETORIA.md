# Revisão da landing page

## Estado atual

- Página inteira em React, com componentes de narrativa, catálogo, plataformas, imprensa e navegação. HTML pré-renderizado para SEO e leitura sem JavaScript.
- Hero com a capa oficial de Quase Indo e fonte original Unbounded, hospedada localmente. Acordeões nativos por plataforma; Spotify abre com o link direto. As demais opções indicam busca ou canal quando não há endereço da faixa confirmado.
- “This Is o Quil” apresenta texto corrido sobre Fillipe Queiroz e o artista o Quil. Sem álbuns repetidos. A rolagem libera caracteres na camada visual, como digitação, mantendo o texto completo acessível e disponível sem JavaScript.
- Faixa estreita em movimento horizontal com Spotify, Apple Music, Amazon Music, YouTube Music, Deezer e TIDAL. Sem YouTube no banner. Os perfis Deezer e TIDAL foram fornecidos pelo usuário; movimento pausável e desativado com a preferência de movimento reduzido.
- Subtítulos em Unbounded, peso 400; título principal preservado em peso 600. Um único CSS de origem substitui as regras inline e as sobreposições antigas.
- Efeitos de entrada e progresso de leitura sem capturar a rolagem. Preferência por movimento reduzido respeitada; conteúdo visível sem JavaScript.
- Todas as oito capas são locais e vieram dos ZIPs do usuário. Capturas de Sombras do Subconsciente e Lost Tracks, Vol. 0 preservadas na resolução enviada, sem recriar ou ampliar artificialmente.
- Canonical, dados estruturados, metadados sociais, sitemap e robots preservados. Artigo do Globo Esporte com título, data e descrição fornecidos pelo usuário; URL original recebida e preservada.

## Pendências históricas

A narrativa usa apenas os fatos disponíveis. Para ampliá-la, continuam pendentes a explicação exata do nome, a data do acidente, períodos de pausa e retorno, contexto do falecimento do irmão e cronologia completa aprovada pelo artista. Não foram inventadas datas ou relações de causa e efeito.

Fontes GE e RAP MAIS cadastradas em FONTES-IMPRENSA.json. A leitura independente foi bloqueada pelo proxy. O mesmo limite impede afirmar disponibilidade e conteúdo atual de todos os links externos. Busca e canal não são tratados como URLs diretas de faixas.

## Publicação e validação

GitHub Pages agora executa instalação com lockfile, build React e verificações; somente os arquivos públicos de dist/ entram no artefato. Ver DESENVOLVIMENTO.md para os comandos e a organização dos componentes.

As verificações estáticas cobrem arquivos locais, IDs, âncoras e estrutura SEO. No Chromium são conferidos imagens, tipografia, ícones, acordeões, hidratação, rolagem e responsividade entre 320 e 1440 px. Incluem JavaScript desativado, bundle bloqueado e movimento reduzido.

A validação local não comprova publicação, indexação ou disponibilidade dos serviços externos.

## Favicon e paleta

O teste vermelho foi descartado; a paleta anterior foi restaurada. O favicon tipográfico genérico foi substituído por uma adaptação simplificada do Q da assinatura, em menta clara sobre fundo escuro. Arquivos PNG de 16 a 1024 px, ICO (16/24/32/48/64/128/256), Apple Touch e ícones maskable 192/512 incluídos. Manifesto, metadados e cópia para dist configurados. Dimensões, recursos HTTP e leitura do manifesto no Chromium validados; o favicon não depende de React.

## Revisão de catálogo, independência e qualidade da capa

“Mais caminhos para ouvir” agora é uma lista cronológica de nove itens, sem imagens e sem o aviso sobre buscas. A seção de singles mantém suas capas.

A narrativa afirma que o Quil é independente, grava e produz suas músicas e cuida de cada etapa do trabalho, conforme confirmação do artista. O trecho da fase atual foi preservado.

O hero usa assets/quase-indo-original.png, uma cópia byte a byte do PNG de 3000×3000 recebido no primeiro ZIP, sem recompressão ou filtros. A versão reduzida de 900 px permanece somente nas miniaturas do catálogo. O arquivo original tem cerca de 6 MB, priorizando a fidelidade solicitada na abertura.

Perfis recebidos: https://www.deezer.com/br/artist/10648821 e https://tidal.com/artist/20087923. O banner tem pausa por controle, hover e teclado, com clones fora da ordem de tabulação e da árvore de acessibilidade. Respeita movimento reduzido, com rolagem horizontal manual nessa preferência.

Validação no Chromium com densidade 2×: PNG de 3000 px, hash idêntico ao arquivo fornecido, ausência de filtro, lista sem imagens/aviso, seis plataformas, URLs dos novos perfis, movimento e pausa, leitura sem JavaScript e larguras de 320 a 1440 px. Sem erros de hidratação ou transbordamento horizontal.

## Controles e digitação após revisão do catálogo

Removidas capas também da lista de singles. As duas listas agora apresentam nomes e links, com anos no arquivo histórico. A capa original continua somente no hero. A numeração que havia sido incorporada aos nomes das plataformas foi removida; os links ganharam ícones, rótulos limpos e superfícies visíveis com borda, vidro e sombra. O acordeão usa details/summary nativo, com animação leve de abertura em React, exclusividade e Escape.

“Dark R&B” aparece uma única vez, na biografia. Foi removido da abertura e das repetições em metadados.

A biografia digita caracteres conforme avança a rolagem, sem apagar o texto ao voltar. O conteúdo completo preserva o layout e fica acessível aos leitores de tela; a camada animada é decorativa. Há controle de leitura sem animação. Sem JavaScript ou com movimento reduzido, o texto aparece completo.

Testes no Chromium confirmaram progresso dos caracteres ao descer, persistência ao subir, opção de texto completo, acordeões, controles visíveis, listas sem imagens, tipografia e responsividade entre 320 e 1440 px. Sem erros de hidratação ou JavaScript.

## Prévia do hero com objeto de capa

A abertura usa a capa como objeto clicável em um details fechado inicialmente. Tamanho de referência: 264 px no desktop e 220 px no celular, mantendo o PNG original de 3000×3000 sem corte, inclinação ou filtro. A animação desloca apenas a arte em até 8 px, sem mover a área de clique; pausa em hover, foco e ao abrir, e é desativada com movimento reduzido.

No celular, o título vem antes da capa para não ser deslocado pela expansão. Ao abrir, a árvore fica no fluxo da página e apresenta seis plataformas com seus logotipos. Os cartões são acordeões exclusivos, com Spotify aberto na primeira visita. Escape fecha primeiro o detalhe mais interno e devolve foco ao respectivo summary. O fluxo nativo funciona sem JavaScript. Conectores são decorativos e não interceptam cliques.

Retirado o min-height de uma tela inteira da abertura e reduzido o padding inicial da biografia para aproximar as seções. A tipografia Unbounded e a paleta foram preservadas.

Testes em oito larguras de 320 a 1440 px, com animação normal, movimento reduzido e JavaScript desativado: capa quadrada, sem transbordamento, original em alta resolução, abertura/fechamento, exclusividade dos nós, teclado e Escape. Build e verificações estáticas passaram. Esta é uma prévia em branch própria, sem publicação na main.

Platônico passou a usar o link direto fornecido: https://open.spotify.com/intl-pt/track/4sV1wMarlXQLniRastfWvf. O parâmetro de compartilhamento foi removido, sem alterar o ID.
