# Limpeza de código

A limpeza preserva os textos exibidos, layout, cores, fontes, estrutura semântica, classes, IDs e atributos de acessibilidade dos elementos usados. Não houve migração de sintaxe, novas dependências ou reescrita de componentes funcionais.

## Código morto removido

| Local | Remoção | Evidência |
| --- | --- | --- |
| src/content.json | 8 campos meta/latest dos quatro lançamentos | Nenhum componente lê esses campos desde a simplificação das listas. |
| src/content.json | 9 campos subtitle do arquivo | Não são renderizados nem consumidos por scripts. |
| src/Streaming.jsx | Fallback streaming-brand para plataforma sem URL | As seis plataformas têm href. Uma verificação agora exige URL HTTPS em todas elas. O ramo ativo e seus atributos foram preservados. |
| src/site.css | Variável --panel | Nenhuma referência var(--panel). |
| src/site.css | .catalog-note, base e media query | Classe ausente do DOM e dos componentes. |
| src/site.css | .archive-row p | Os itens do arquivo não contêm parágrafos. |
| src/site.css | .narrative-copy p:before e ajuste mobile | Sobra do destaque antigo, permanentemente invisível. A digitação usa outra camada e não foi alterada. |
| src/site.css | Seletor streaming-brand | Só atendia ao fallback removido. |
| src/site.css | 7 declarações anteriores de borda, padding, cor, gap e fonte | Sempre anuladas por declarações posteriores na mesma cascata, sem mudança de resultado. |
| src/site.css | Propriedades de grid do seletor mobile release-platforms | details permanece display:block; não usava grid-template-columns nem gap. As regras do arquivo cronológico foram preservadas. |
| .build/ | story-server.cjs e story-server.mjs antigos | Dois artefatos locais ignorados, deixados pelo build parcial anterior; o build atual usa server.cjs. |

## O que foi inspecionado e preservado

Não foram encontrados imports, estados, refs, funções ou componentes sem uso nos fontes atuais. Os imports React continuam necessários ao JSX clássico configurado no esbuild.

Também foram preservados os originais de arte, as licenças, os arquivos históricos e os comentários que explicam acessibilidade e compatibilidade. Não foram tratados como lixo apenas por não aparecerem no layout.

A camada de texto completo da biografia foi preservada: reserva o espaço e serve aos leitores de tela e ao HTML sem JavaScript. Observadores, timers, limpeza de eventos, teclado, animações e preferências de movimento reduzido não foram reescritos.

## Validação de paridade

- DOM idêntico antes e depois em 320, 390, 768, 940 e 1440 px. Inclui os textos exibidos, os elementos, classes, IDs, aria-* e destinos dos links da referência.
- 10 pares de capturas de página inteira, com lista fechada e aberta: zero pixels diferentes nas cinco larguras testadas, com movimento reduzido para tornar a comparação determinística.
- Medidas e estilos em estados aberto, hover e foco comparados. A única diferença de estilo computado foi gap inativo em details com display:block; dimensões e pixels ficaram idênticos.
- Testes funcionais confirmaram acordeões exclusivos, teclado/Escape, digitação conforme a rolagem, opção de ler sem animação, movimento reduzido, leitura sem JavaScript, ausência de erros de hidratação e ausência de rolagem horizontal.
- npm run build, npm run check e git diff --check passaram.

Essas verificações comprovam a paridade nos casos testados; não representam uma auditoria de todos os navegadores existentes. As capturas usam a mesma política de rede e o mesmo Chromium nas duas versões.

## Redução medida

| Arquivo | Antes | Depois | Redução |
| --- | ---: | ---: | ---: |
| src/site.css | 16.099 bytes | 15.490 bytes | 609 bytes |
| src/content.json | 14.712 bytes | 14.237 bytes | 475 bytes |
| assets/site.css | 15.666 bytes | 15.057 bytes | 609 bytes |
| assets/app.js | 230.979 bytes | 230.507 bytes | 472 bytes |

A economia é pequena e deliberadamente conservadora. O ganho principal é retirar regras e dados obsoletos sem alterar o comportamento.

## Links recebidos antes da limpeza

Noites Online foi atualizado antes de registrar a referência visual. Motivos foi registrado no mapa de links, sem criar uma nova entrada ou alterar textos. Essa solicitação anterior está separada da limpeza na comparação. Ver SPOTIFY-PENDENCIAS.md.
