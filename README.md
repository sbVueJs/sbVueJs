# Single-Built Vue.js

<p align="center">
   <img src="./assets/logo/logomarca.svg">
</p>

> **sbVue**: Um framework para construção de formulários para aplicativos locais utilizando WEB com Vue.js via CDN. Seu propósito é acadêmico, servindo de treinamento acadêmico em HTML, CSS, JS e Vue CDN

<p align="center">
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/vue.js-3.0-green.svg" alt="Vue.js">
  </a>
  <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">
    <img src="https://img.shields.io/badge/JavaScript-ES6-yellow.svg" alt="JavaScript">
  </a>
  <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS">
    <img src="https://img.shields.io/badge/CSS3-blue.svg" alt="CSS">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
  </a>
  <a href="./README.md">
    <img src="https://img.shields.io/badge/version-0.1.0-brightgreen" alt="Version 0.1.0">
  </a>
</p>
**sbVue** é uma biblioteca de componentes baseada em Vue.js, desenvolvida para criar rapidamente layouts de **aplicativos web**, sem necessidade de backend. O foco do projeto é no aprendizado e prática de **HTML**, **CSS** e **JavaScript**, com uma abordagem modular, sendo ideal para estudantes e desenvolvedores que estão aprendendo sobre a criação de sistemas web. **Todos são bem-vindos para contribuir** e fazer parte deste projeto.

## Estrutura do Projeto

```
├── assets/
│   └── (Imagens e arquivos estáticos)
├── src/
│   ├── components/
│   │   ├── sbApp/
│   │   │   ├── sbApp.js
│   │   │   └── sbAppExample.html
│   │   └── sbForm/
│   │       ├── sbButton.js
│   │       ├── sbForm.js
│   │       ├── sbFormLine.js
│   │       ├── sbInput.js
│   │       └── (Exemplos .html de cada componente)
└── (Outras pastas)
```

Para começar, clone o repositório e utilize a pasta **src** para criar e modificar os componentes necessários ao seu projeto.

```bash
git clone https://github.com/sbVueJs/sbVueJs.git
cd sbVueJs/src
```

## Instalação e Uso

Adicione o Vue.js normalmente na sessão HEAD de um arquivo HTML:

```html
<!-- Vue.js via CDN -->
<script src="https://unpkg.com/vue@3"></script>
```

No final do arquivo importe (na sessão de inicialização do Vue), cada componente que for utilizar 

```html

    <script type="module">
    // Importação de componente
    import { sbApp } from './sbApp.js';

        // Inicialização do componente
        // junto com criação da instância do Vue
        Vue.createApp({
            components: {
                'sb-app': sbApp
            },
            
            // ...
            
            }).mount('#app');
    </script>
```

## Componentes Disponíveis

### `sbApp`

O componente `sbApp` fornece uma estrutura básica de página com **navbar**, **menu** e **footer**.

**Principais Props:**
- `footerText`: Texto customizado para o rodapé.
- `navbarHeight`: Altura do navbar (padrão: `10vh`).
- `footerHeight`: Altura do footer (padrão: `5vh`).
- `navbarColor`: Cor do navbar (padrão: `#A0A4A8`).
- `footerColor`: Cor do footer (padrão: `#8B9094`).
- `log`: Boolean para ativar logs no console.

### `sbForm`

Componente para criação de formulários com múltiplos campos.

**Principais Props:**
- `action`: Define a ação para o submit do formulário.
- `method`: Método de envio (ex: `POST`, `GET`).
- `formTitle`: Título exibido no topo do formulário.

### `sbButton`

Componente de botão estilizado.

**Principais Props:**
- `label`: Texto exibido no botão.
- `type`: Tipo do botão (ex: `submit`, `button`).
- `color`: Cor de fundo do botão (padrão: `#8bcce7`).

### `sbInput`

Componente de campo de entrada para formulários.

**Principais Props:**
- `label`: Rótulo do campo.
- `type`: Tipo do input (ex: `text`, `email`, `password`).
- `placeholder`: Placeholder exibido dentro do campo.

### `sbFormLine`

Linha de formulário que agrupa inputs.

**Principais Props:**
- `label`: Rótulo da linha de formulário.
- `align`: Alinhamento dos campos dentro da linha (ex: `left`, `center`, `right`).

## Contribuindo

Se você deseja contribuir, siga os seguintes passos:

1. Faça um **fork** deste repositório.
2. Crie uma nova branch para sua feature ou correção: `git checkout -b minha-feature`.
3. Faça um **commit** das suas mudanças: `git commit -m 'Minha nova feature'`.
4. Faça um **push** para a branch: `git push origin minha-feature`.
5. Abra um **pull request** e descreva suas mudanças.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.