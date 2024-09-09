export const sbForm = {
  props: {
    zebraStripe: {
      type: Boolean,
      default: false  // Ativa o padrão zebra
    },
    zebraColorEven: {
      type: String,
      default: '#f2f2f2'  // Cor para as linhas pares
    },
    zebraColorOdd: {
      type: String,
      default: '#ffffff'  // Cor para as linhas ímpares
    },
    titleBar: {
      type: Boolean,
      default: false  // Exibe a barra de título
    },
    title: {
      type: String,
      default: 'Título do Formulário'  // Título do formulário
    },
    minimizable: {
      type: Boolean,
      default: false  // Define se o formulário pode ser minimizado
    },
    log: {
      type: Boolean,
      default: false  // Logs de depuração
    }
  },
  data() {
    return {
      minimized: false  // Controla o estado de minimização
    };
  },
  computed: {
    formStyle() {
      return {
        display: this.minimized ? 'none' : 'block'  // Oculta o formulário se minimizado
      };
    }
  },
  methods: {
    applyZebra(index) {
      if (this.zebraStripe) {
        return index % 2 === 0 ? this.zebraColorEven : this.zebraColorOdd;
      }
      return 'transparent';  // Retorna transparente se zebraStripe for false
    },
    toggleMinimize() {
      this.minimized = !this.minimized;
      this.logMessage(this.minimized ? 'Formulário minimizado.' : 'Formulário expandido.');
    },
    logMessage(message) {
      if (this.log) {
        console.log(message);
      }
    }
  },
  template: `
    <div class="sb-form-container">
      <div v-if="titleBar" class="sb-title-bar" @click="minimizable && toggleMinimize" :style="{cursor: minimizable ? 'pointer' : 'default'}">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>{{ title }}</span>
          <button v-if="minimizable" @click="toggleMinimize">{{ minimized ? '+' : '-' }}</button>
        </div>
      </div>
      
      <div class="sb-form-content" :style="formStyle">
        <slot></slot> <!-- Apenas renderizamos o slot diretamente, sem v-for -->
      </div>
    </div>
  `
};
