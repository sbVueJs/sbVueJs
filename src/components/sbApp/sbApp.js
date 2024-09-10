let sbCssDefs = {};

try {
  sbCssDefs = require('./sbCssDefs.js');
  if (this && this.debug) {
    console.debug('%c sbCssDefs.js carregado com sucesso.', 'color: green;');
  }
} catch (error) {
  if (this && this.debug) {
    console.debug('%c sbCssDefs.js não encontrado. Usando valores padrão.', 'color: orange;');
  }
}


export const sbApp = {
  props: {
    footerText: {
      type: String,
      default: '© 2024 Meu Projeto Customizado'
    },
    navbarHeight: {
      type: String,
      default: sbCssDefs.navbarHeight || '10vh'
    },
    footerHeight: {
      type: String,
      default: sbCssDefs.footerHeight || '5vh'
    },
    navbarColor: {
      type: String,
      default: sbCssDefs.navbarColor || '#A0A4A8'
    },
    footerColor: {
      type: String,
      default: sbCssDefs.footerColor || '#8B9094'
    },
    menuColor: {
      type: String,
      default: sbCssDefs.menuColor || '#BEC2C6'
    },
    menuHoverColor: {
      type: String,
      default: sbCssDefs.menuHoverColor || '#8bcce7'
    },
    menuSelectedColor: {
      type: String,
      default: sbCssDefs.menuSelectedColor || '#1C1C1C'
    },
    menuSelectedFontColor: {
      type: String,
      default: sbCssDefs.menuSelectedFontColor || 'white'
    },
    burgerSize: {
      type: String,
      default: sbCssDefs.burgerSize || '30px'
    },
    log: {
      type: Boolean,
      default: false
    },
    debug: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMenuOpen: false,
      selectedMenu: '',
      menuItems: []
    };
  },
  mounted() {
    this.logMessage('Componente sbApp montado com sucesso.', 'log');
    this.collectMenuItems();
    this.injectCSS();
    this.logMessage('Componente montado corretamente.', 'debug');

    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    logMessage(message, type = 'log') {
      const styles = {
        log: 'color: blue;',
        warn: 'color: orange;',
        error: 'color: red;',
        debug: 'color: purple;'
      };

      // Se o 'debug' estiver ativado, ele sobrepõe todas as mensagens de log
      if (this.debug) {
        console.debug(`%c${message}`, styles.debug);
      } else if (this.log && type === 'log') {
        console.log(`%c${message}`, styles.log);
      } else if (type === 'warn') {
        console.warn(`%c${message}`, styles.warn);
      } else if (type === 'error') {
        console.error(`%c${message}`, styles.error);
      }
    },
        collectMenuItems() {
      const templates = this.$slots;
      for (let name in templates) {
        if (name !== 'default') {
          this.menuItems.push(name);
        }
      }
      if (this.menuItems.length > 0) {
        this.selectedMenu = this.menuItems[0];
        this.logMessage('Menu inicial selecionado: ' + this.selectedMenu, 'log');
      }
      this.logMessage('Menus gerados dinamicamente: ' + JSON.stringify(this.menuItems), 'debug');
    },
    selectMenu(menu) {
      this.selectedMenu = menu;
      this.isMenuOpen = false;
      this.$emit('menu-change', menu);
      this.logMessage('Menu item selecionado: ' + menu, 'log');
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.logMessage('Menu ' + (this.isMenuOpen ? 'aberto' : 'fechado'), 'log');
    },
    injectCSS() {
      if (!document.getElementById('sbApp-styles')) {
        const style = document.createElement('style');
        style.id = 'sbApp-styles';
        style.textContent = this.generateStyles();
        document.head.appendChild(style);
        this.logMessage('Estilos dinâmicos injetados com sucesso.', 'log');
      } else {
        this.logMessage('Estilos já injetados. Evitando duplicação.', 'debug');
      }
    },
    generateStyles() {
      return `
        .sb-app {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }
        .sb-app .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: ${this.navbarHeight};
          background-color: ${this.navbarColor};
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2000;
        }
        .sb-app .hamburger-btn {
          font-size: ${this.burgerSize};
          border: none;
          background: none;
          cursor: pointer;
          color: white;
        }
        .sb-app .menu {
          display: flex;
          flex-direction: column;
          background-color: ${this.menuColor};
          position: absolute;
          left: 0;
          top: ${this.navbarHeight};
          width: 250px;
          height: 100vh;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }
        .sb-app.menu-open .menu {
          transform: translateX(0);
        }
        .sb-app .menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sb-app .menu ul li {
          padding: 10px;
          color: black;
          cursor: pointer;
        }
        .sb-app .menu ul li:hover {
          background-color: ${this.menuHoverColor};
        }
        .sb-app .menu ul li.selected {
          background-color: ${this.menuSelectedColor};
          color: ${this.menuSelectedFontColor};
        }
        .sb-app .content-container {
          flex-grow: 1;
          margin-top: ${this.navbarHeight};
          margin-left: 250px;
          height: 100vh;
          padding: 3px;
          box-sizing: border-box;
          overflow-y: auto;
          transition: margin-left 0.3s ease-in-out;
        }
        .sb-app.menu-open .content-container {
          margin-left: 250px;
        }
        .sb-app .content-container iframe, .sb-app .content-container div {
          width: 100%;
          height: calc(98vh - ${this.navbarHeight});
          border: none;
        }
        .sb-app footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: ${this.footerHeight};
          background-color: ${this.footerColor};
          text-align: center;
          padding: 10px;
        }
      `;
    },
    handleOutsideClick(event) {
      if (this.isMenuOpen && !event.target.closest('.menu') && !event.target.closest('.hamburger-btn')) {
        this.isMenuOpen = false;
        this.logMessage('Menu fechado por clique fora.', 'debug');
      }
    }
  },
  template: `
    <div :class="{'menu-open': isMenuOpen, 'sb-app': true}">
      <!-- Navbar fixa no topo -->
      <nav class="navbar">
        <button class="hamburger-btn" @click="toggleMenu">
          &#9776;
        </button>
      </nav>

      <!-- Menu lateral -->
      <div class="menu">
        <ul>
          <li v-for="(menu, index) in menuItems" :key="index" 
              @click="selectMenu(menu)" 
              :class="{ selected: selectedMenu === menu }">
            {{ menu }}
          </li>
        </ul>
      </div>

      <!-- Conteúdo dinâmico -->
      <div class="content-container" :style="{ marginLeft: isMenuOpen ? '250px' : '0' }">
        <div v-for="menu in menuItems" v-show="selectedMenu === menu">
          <slot :name="menu"></slot>
        </div>
      </div>

      <!-- Footer -->
      <footer>
        <p>{{ footerText }}</p>
      </footer>
    </div>
  `
};
