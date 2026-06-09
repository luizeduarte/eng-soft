# Análise de Padrões de Projeto (GoF) no Sistema de Relatórios

Este documento lista todos os 23 Padrões de Projeto do "Gang of Four" (GoF), categorizando-os entre os que **foram aplicados** na refatoração deste projeto (e os motivos pelos quais valeu a pena) e os que **não foram aplicados** (e as razões de não se adequarem ao contexto deste sistema de relatórios).

---

## 🟢 Padrões Aplicados (Por que valeu a pena)

### 1. Strategy (Comportamental)
**Onde foi aplicado:** 
- Na interface abstrata `src/core/Formatter.js` e suas implementações concretas (`HtmlFormatter`, `TxtFormatter`, `CsvFormatter`, `MarkdownFormatter`).
- Na interface abstrata `src/core/DataReader.js` e suas implementações concretas (`JsonDataReader`, `CsvDataReader`).
**Por que valeu a pena:** O sistema exige que o comportamento de formatação e o algoritmo de leitura dos dados mudem dinamicamente em tempo de execução (via linha de comando). O padrão Strategy evitou que a classe principal (`ReportGenerator`) fosse infestada de comandos `if/else` para lidar com cada formato. Ao encapsular cada formato em sua própria classe, garantimos o cumprimento do **Princípio Aberto/Fechado (OCP)** (podemos adicionar novos formatos sem alterar os existentes ou o gerador).

### 2. Factory Method / Simple Factory (Criacional)
**Onde foi aplicado:** 
- Em `src/factories/FormatterFactory.js` (método `createFormatter`).
- Em `src/factories/ReaderFactory.js` (método `createReader`).
**Por que valeu a pena:** Era necessário isolar a complexidade de instanciar o objeto correto com base em uma string recebida do terminal. A Factory concentra essa lógica de criação em um só lugar. Assim, a camada principal do sistema depende apenas de abstrações (interfaces), e quem decide qual classe concreta será inicializada é a Factory.

### 3. Template Method (Comportamental)
**Onde foi aplicado:**
- Em `src/core/Formatter.js` (no método principal `format(cities)`).
**Por que valeu a pena:** Todos os relatórios seguem um esqueleto idêntico: gerar um cabeçalho, percorrer as cidades formatando cada item, e gerar um rodapé. O *Template Method* definiu esse fluxo invariável na classe pai (`format()`), enquanto delegou a implementação específica do cabeçalho (`getHeader()`), do item (`formatItem()`) e do rodapé (`getFooter()`) para as subclasses através de *hooks*. Isso reduziu massivamente a duplicação de código.

---

## 🔴 Padrões Não Aplicados (Por que não valeram a pena neste contexto)

Abaixo estão os 20 padrões restantes, agrupados por categoria, e o motivo de não serem necessários ou não agregarem valor ao contexto específico de um gerador de relatórios estático via CLI.

### Padrões Criacionais

1. **Abstract Factory:** Serve para criar "famílias" de objetos dependentes ou relacionados (ex: botões e barras de rolagem para Mac vs Windows). No nosso sistema, os leitores (Readers) e os formatadores (Formatters) não são famílias dependentes; qualquer leitor funciona com qualquer formatador livremente.
2. **Builder:** Utilizado para construir objetos complexos passo a passo. Nossos objetos de leitura e formatação são simples de instanciar (não possuem estado interno complexo ou construtores com muitos parâmetros). O comando `new HtmlFormatter()` já basta.
3. **Prototype:** Focado em clonar objetos custosos em vez de recriá-los do zero. Como nossos objetos não possuem estado interno pesado, instanciar usando a palavra-chave `new` é tão eficiente quanto clonar.
4. **Singleton:** Garante uma única instância de uma classe. Embora pudéssemos ter feito nossas Factories em instâncias Singleton, a abordagem mais simples e correta em Javascript (e sem manter estados na memória) foi usar classes com métodos estáticos (`static createFormatter()`), obtendo o mesmo resultado sem o *overhead* do padrão Singleton.

### Padrões Estruturais

5. **Adapter:** Converte a interface de uma classe existente para outra interface esperada. Como nós refatoramos e controlamos o código fonte de todas as partes, definimos as interfaces nativamente sem precisar de adaptação de classes legadas ou de terceiros.
6. **Bridge:** Desacopla uma abstração da sua implementação para que ambas variem independentemente. Embora as abstrações variem (Reader e Formatter), elas não criam hierarquias multidimensionais. O *Strategy* já resolveu totalmente o acoplamento de forma mais limpa para esta escala.
7. **Composite:** Permite agrupar objetos em estruturas de árvore. Nossos dados (`cities`) são uma lista plana e sequencial, não uma árvore ou hierarquia de pastas/arquivos, tornando este padrão irrelevante.
8. **Decorator:** Adiciona comportamentos extras aos objetos dinamicamente. Nosso sistema executa apenas a conversão estrita de "A" para "B". Não há necessidade de envelopar componentes com comportamentos adicionais (como compressão gzip ou encriptação).
9. **Facade:** Fornece uma interface simplificada para um subsistema muito complexo. O nosso `ReportGenerator` orquestra duas etapas muito simples, sem um grande ecossistema ou APIs complexas por baixo que necessitem de uma "fachada".
10. **Flyweight:** Compartilha estados para reduzir o consumo de memória ao lidar com milhões de objetos. Estamos operando em um CLI simples com um arquivo CSV/JSON de algumas dezenas/centenas de itens, o que cabe muito facilmente na memória RAM alocada pelo NodeJS, inviabilizando qualquer otimização dessa complexidade.
11. **Proxy:** Controla e substitui o acesso a um objeto (ex: para lazy-loading ou segurança). A nossa execução é local, direta e sem necessidade de interceptação ou atrasos, logo o Proxy não é justificável.

### Padrões Comportamentais

12. **Chain of Responsibility:** Passa pedidos por uma corrente de "handlers" até que um o processe. Em nosso caso, o tratador correto (formato ou leitura) já é definido diretamente na entrada (via Strategy/Factory) e sabemos de antemão qual objeto irá processar.
13. **Command:** Encapsula uma requisição como objeto (útil para filas, macro ou ações *Undo/Redo*). Sendo um script executado uma única vez na linha de comando que apenas exibe um resultado final (sem alterar os arquivos fontes), não há necessidade de enfileirar ações ou desfazê-las.
14. **Interpreter:** Fornece um avaliador para uma linguagem e gramática específicas. Nós apenas convertemos estruturas de dados conhecidas usando bibliotecas padrão de JSON e CSV, sem precisar interpretar sintaxes ou linguagens gramaticais próprias.
15. **Iterator:** Encapsula o acesso sequencial de elementos de uma coleção. O JavaScript já nos fornece iteradores nativos eficientes para Arrays (`for...of`), dispensando a necessidade de construir um Iterator próprio do GoF.
16. **Mediator:** Centraliza a comunicação complexa entre dezenas de componentes. O nosso sistema não tem fluxo bidirecional; os componentes não trocam mensagens, apenas recebem ordem direta do sistema principal.
17. **Memento:** Permite capturar e restaurar estados de objetos (*Undo*). Como nosso gerador apenas lê e escreve estaticamente e os dados são imutáveis após lidos, não há necessidade de salvar ou restaurar estados anteriores.
18. **Observer:** Cria mecanismo de assinatura para avisar objetos de mudanças em outro objeto. Este é um CLI linear, síncrono, que roda do topo ao fim, sem eventos complexos (ex: UI asíncrona) reagindo a ações.
19. **State:** Altera o comportamento do objeto quando seu estado interno muda. O gerador de relatório é *stateless* (sem estado), ele recebe uma entrada, processa e entrega o resultado sem assumir estados diferentes ("Esperando", "Carregando", etc.) que alterem sua mecânica principal.
20. **Visitor:** Adiciona lógicas à estruturas de dados compostas e com tipos diversos sem modificar essas classes. Nosso modelo é apenas uma classe genérica simples e constante (`City`). A lógica de formato está perfeitamente bem localizada dentro do `Formatter` via Strategy, sem justificar um *Visitor*.