# Pokedex
Este projeto é uma aplicação desenvolvida em Vue.js 3 utilizando a Composition API, Vite e TypeScript. A aplicação consome dados da PokeAPI para exibir uma lista de Pokémon com paginação, detalhes específicos de cada Pokémon, e opções de busca e filtro.

## **Funcionalidades Implementadas**
### 1. **Listagem de Pokémon**
- Exibição de uma lista paginada de Pokémon com suas **imagens**, **nomes** e **números**.
- Implementação de paginação, permitindo navegação entre as páginas de Pokémon (com suporte para paginação clássica ou scroll infinito).

### 2. **Detalhes do Pokémon**
- Exibição das **estatísticas** detalhadas ao selecionar um Pokémon: **HP**, **Ataque**, **Defesa**, **Ataque Especial**, **Defesa Especial** e **Velocidade**.
- Apresentação dos **tipos** do Pokémon com cores específicas associadas a cada tipo.
- Exibição da cadeia de **evoluções**, mostrando imagens e nomes dos Pokémon na linha evolutiva.

### 3. **Busca e Filtro**
- **Busca por Nome ou Número**: Implementação de uma barra de busca que permite pesquisar Pokémon pelo **nome** ou **número**, exibindo resultados em tempo real ou ao submeter a pesquisa.
- **Filtro por Tipo**: Permitir a filtragem da lista de Pokémon por **tipos** (água, fogo, grama, etc.), com atualização em tempo real da listagem.

### 4. **Responsividade e Desempenho**
- A aplicação foi otimizada para ser **responsiva**, funcionando bem tanto em dispositivos móveis quanto em desktops.
- **Otimizações** foram feitas para garantir uma boa performance e uma experiência de usuário agradável.

## **Tecnologias Utilizadas**
- **Vue.js 3** com **Composition API** para estruturação da interface e manipulação de dados.
- **Vite** para empacotamento e desenvolvimento rápido.
- **TypeScript** para tipagem estática e melhor manutenção do código.
- **Bootstrap** para facilitar a responsividade e o layout da aplicação.
- **PokeAPI** para consumo de dados relacionados aos Pokémon (https://pokeapi.co/docs/v2).

## **Requisitos**
- Node.js (v14+)
- Gerenciador de pacotes npm ou yarn

## **Passos para rodar o projeto**
1. Clone o repositório:

    ```bash
    git clone git@github.com:Mario-Nakazato/pokedex.git
    cd projeto
    ```

2. Instale as dependências:

    Se estiver usando NPM:

    ```bash
    npm install
    ```

    Se estiver usando Yarn:

    ```bash
    yarn install
    ```

## Execução

1. Para rodar a aplicação em ambiente de desenvolvimento, utilize o comando:

    Se estiver usando NPM:

    ```bash
    npm run dev
    ```

    Se estiver usando Yarn:

    ```bash
    yarn dev
    ```

2. A aplicação será iniciada em: `http://localhost:5173`
  
# Decisões Técnicas

- **Arquitetura**: O projeto é estruturado em uma arquitetura modularizada, composta por controllers, services e repositories. Essa abordagem proporciona uma escalabilidade superior e facilita a manutenção do código, permitindo que diferentes partes do sistema sejam desenvolvidas e testadas de forma independente.

- **UI e Responsividade**: A adoção do Bootstrap possibilita a criação de uma interface responsiva de maneira ágil e eficiente. Essa escolha reduz a necessidade de customizações complexas em CSS, garantindo que o layout se adapte perfeitamente a diferentes dispositivos e tamanhos de tela.

- **Requisições HTTP**: O Axios foi escolhido como ferramenta para gerenciar requisições HTTP, simplificando a integração com APIs externas e tornando o tratamento de respostas assíncronas mais intuitivo, resultando em uma experiência de desenvolvimento mais fluida e menos propensa a erros.


## Funcionalidades Adicionais

- Paginação com opção de scroll infinito para melhorar a experiência do usuário ao navegar pela lista de Pokémon.
  
- Filtros dinâmicos com atualização instantânea da listagem.
