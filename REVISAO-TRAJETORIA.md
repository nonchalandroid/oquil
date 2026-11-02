# Revisão da trajetória de o Quil

## Implementado

- Seção “This Is o Quil” preservada, sem o iframe de playlist Spotify.
- Título “A trajetória de o Quil”, introdução em português e lista cronológica sem carrossel ou interação obrigatória.
- Retrato e capa de Quase Indo já disponíveis no projeto, com carregamento adiado e espaço reservado.
- Marcos iniciais limitados às informações existentes no repositório: início como Fillipe Queiroz, Sinergia (2014), Por Via das Dúvidas (2015) e fase atual (2026).
- Links para a referência VICE já cadastrada no projeto. Essa referência não foi revalidada externamente nesta revisão.
- Paleta e fontes preservadas. Contrastes de textos secundários, foco visível, link de salto para conteúdo e navegação por âncoras refinados.
- O título do catálogo antigo passou a “Arquivo de lançamentos”, para distinguir catálogo e trajetória pessoal.

## Confirmações necessárias antes de concluir a publicação

A linha do tempo é uma primeira versão parcial. Os itens abaixo não foram inseridos como fatos públicos nem substituídos por datas aproximadas.

| Item | Informação necessária |
| --- | --- |
| Mudança de nome em 2014 | Confirmação do ano e explicação exata da relação entre as letras de Fillipe Queiroz e o nome o Quil. As matérias de 2014 e 2015 citadas no projeto ainda usam Fillipe Queiroz; não inferir a cronologia a partir disso. |
| Discografia completa | Relação aprovada dos projetos, anos e capas. Datas do catálogo existente não constituem nova apuração. |
| Acidente de carro | Links RAP MAIS e Resenha do RAP, data correta e contexto aprovado. |
| Pausas e retornos | Períodos confirmados e quais projetos marcaram as retomadas. Confirmar Rehab Tape (2018) e AINDA (2021). |
| Falecimento do irmão | Texto e data confirmados; não relacionar automaticamente a hiatos ou lançamentos. |
| Fotografias históricas | Materiais de cada fase e respectivas identificações. O retrato existente não foi atribuído a um ano. |

## PRESS: matéria do Globo Esporte incluída

Informações recebidas no brief, ainda sem conferência independente:

- Veículo: Globo Esporte.
- Título: “CS:GO: familiares, companheiros e grandes nomes do cenário homenageiam brutt nas redes sociais”.
- Data indicada: 16 de dezembro de 2019.
- Relação indicada: menção a o Quil entre os irmãos que homenagearam brutt.

O usuário forneceu a URL original, agora incluída na seção PRESS e em FONTES-IMPRENSA.json:

https://ge.globo.com/e-sportv/csgo/noticia/csgo-familiares-companheiros-e-grandes-nomes-do-cenario-homenageiam-brutt-nas-redes-sociais.ghtml

O título, a data e a descrição breve seguem os dados fornecidos no brief. A leitura independente ainda não foi possível: o proxy respondeu HTTP 403 ao túnel HTTPS. Não foram acrescentadas consequências pessoais, causas ou datas de falecimento.

Também foi recebida e cadastrada a fonte do RAP MAIS:

https://portalrapmais.com/rapper-o-quill-chega-com-tudo-no-videoclipe-de-ainda-confira/

Essa consulta também foi bloqueada pelo proxy. O conteúdo do artigo não foi lido. Nenhuma data do acidente, hiato ou retorno foi deduzida do endereço da matéria. A cronologia aguarda trechos da reportagem ou acesso à fonte.

## Validação executada

Chromium com Playwright, tamanhos 390×900, 768×900 e 1440×900:

- Nenhum iframe na seção sobre e quatro marcos na lista cronológica.
- Sem rolagem horizontal.
- Link “Ir para o conteúdo” acessível por teclado e funcional.
- Menus de plataformas abrem, fecham o anterior e respondem a Escape.
- Sem erros de JavaScript.
- Requisições de terceiros bloqueadas deliberadamente nos testes para isolar o site local. Fontes e mídias externas não foram validadas.

A revisão não foi publicada. A confirmação editorial permanece necessária para completar os marcos pessoais e conferir de forma independente as matérias recebidas.

## Refinamento de layout, CTA e SEO

- Corrigido o conflito de posicionamento de `.hero-media`, com contenção explícita. No desktop, fotografia e texto ocupam áreas separadas; no celular, imagem acima do conteúdo.
- Retrato da trajetória usa a proporção real 1600×899, sem animação, recorte vertical forçado ou posição fixa na rolagem.
- CTA principal “Ouvir no Spotify”, com o link direto já fornecido no projeto; catálogo como ação secundária e “Ouvir agora” na navegação.
- Símbolos de seta e expansão substituídos por ícones SVG de traço uniforme, decorativos e sem foco de teclado. Sem emojis.
- Refinamentos organizados em assets/refinamentos.css, sem adicionar framework ou dependências ao site estático.
- SEO técnico: título, descrição, canonical, Open Graph, Twitter Card, dados estruturados Person/WebSite/WebPage/MusicRecording, sitemap.xml e referência no robots.txt.
- Domínio canônico adotado: https://oquil.com.br/, conforme CNAME e brief. Nenhuma data histórica pendente foi adicionada aos dados estruturados.
- SEO e compartilhamento foram conferidos localmente; indexação, resultados de busca, rastreamento e configuração do domínio em produção dependem da publicação. Sem garantia de posição em buscadores.

## Capas fornecidas em capas.zip

Integradas seis artes locais: Quase Indo, Se Move, TAG, Consequência de Estar Acordado, Lost Tracks e Platônico. Derivados WebP com até 900 px, mantendo a proporção e sem recriar ou retocar as artes. Os seis arquivos somam cerca de 593 KiB, em vez de aproximadamente 23 MiB dos originais. Os originais recebidos permanecem no anexo do ambiente.

Se Move, TAG e Consequência de Estar Acordado deixam de depender do CDN Spotify. Lost Tracks também passa a usar arquivo local; Platônico ganha sua capa no arquivo de lançamentos. Quase Indo usa a versão final enviada. Corrigida a inicialização do estado de imagens já carregadas do cache para evitar que o fallback cubra uma imagem válida.

As duas capas restantes foram fornecidas posteriormente no arquivo capaz 2.zip e integradas conforme o registro abaixo. MAPA-CAPAS-E-LINKS.json atualizado com todos os caminhos locais.


## Capas restantes recebidas em capaz 2.zip

Lost Tracks, Vol. 0 (747×740) e Sombras do Subconsciente (812×787) agora usam WebP local derivado das capturas enviadas. Sem ampliação artificial, recriação ou retoque; a qualidade fica limitada às capturas fornecidas. Todas as capas exibidas no HTML agora são locais, sem dependência do CDN Spotify.

## Revisão após feedback de janela lado a lado

- Removidos “Ouvir agora” da navegação e YouTube/YouTube Music da abertura. Permanecem Spotify e catálogo como ações da abertura.
- Foto e conteúdo da abertura agora compartilham um grid. Até 900 px, a foto ocupa uma linha inteira acima do texto; em larguras maiores acompanha a altura da coluna de conteúdo. Sem miniatura posicionada no rodapé da abertura nem sobreposição com a navegação.
- “This Is o Quil” passa a uma linha do tempo em coluna única, sem repetir o retrato e a capa já exibidos em outras seções.
- Conteúdo visível sem JavaScript, sem depender do IntersectionObserver para mostrar seções. Capas sem escurecimento adicional ou fallback cobrindo a imagem.
- URL do CSS versionada para evitar reutilização da versão anterior em cache.
- A main remota já continha os oito arquivos locais de capas. A leitura do domínio de produção foi bloqueada pela rede; não foi possível determinar se o print corresponde a cache, deploy anterior ou outro problema da publicação.
- Validação local com redimensionamento contínuo de 1440 a 320 px, incluindo 940 px para janela dividida, com e sem JavaScript: imagens decodificadas, ausência de transbordamento horizontal, mídia contida e conteúdo abaixo da navegação.

## Hero com capa e acordeões de plataformas

- Capa oficial de Quase Indo em destaque na abertura, inteira, sem corte ou filtro adicional.
- Fonte original Unbounded, peso 600 e espaçamento original do título preservados. Arquivo variável WOFF2 hospedado localmente, derivado da fonte oficial Google Fonts (ofl/unbounded/Unbounded[wght].ttf), com licença OFL em assets/unbounded-OFL.txt. Sem dependência externa para renderizar o título.
- Cinco acordeões nativos details/summary, um por plataforma: Spotify, Apple Music, Amazon Music, YouTube Music e YouTube. Grupo exclusivo, utilizável por teclado e sem JavaScript. Spotify começa aberto, com CTA direto.
- Spotify usa o endereço da faixa já fornecido; Apple Music, Amazon Music e YouTube Music usam buscas explicitamente identificadas; YouTube abre o canal. Esses destinos não foram apresentados como URLs individuais confirmadas de streaming.
- Testado carregamento real da fonte local e da capa, expansão/recolhimento por teclado, exclusividade dos acordeões e ajuste do título em nove larguras entre 320 e 1440 px, com e sem JavaScript e requisições externas bloqueadas. Sem erros de JavaScript.
