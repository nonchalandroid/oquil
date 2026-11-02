# Revisão da landing page

## Estado atual

- Página inteira em React, com componentes de narrativa, catálogo, plataformas, imprensa e navegação. HTML pré-renderizado para SEO e leitura sem JavaScript.
- Hero com a capa oficial de Quase Indo e fonte original Unbounded, hospedada localmente. Acordeões nativos por plataforma; Spotify abre com o link direto. As demais opções indicam busca ou canal quando não há endereço da faixa confirmado.
- “This Is o Quil” apresenta texto corrido sobre Fillipe Queiroz e o artista o Quil. Sem álbuns repetidos. A rolagem destaca o parágrafo em leitura.
- Faixa estreita com ícones locais de Spotify, Apple Music, Amazon Music, YouTube Music e YouTube, as plataformas cujos links já constam do projeto. Não foram acrescentadas plataformas sem informações fornecidas.
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
