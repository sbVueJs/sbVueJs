let sbCssDefs = {};

try {
  sbCssDefs = require('./sbCssDefs.js');
  console.log('%c sbCssDefs.js carregado com sucesso.', 'color: green;');
} catch (error) {
  console.warn('%c sbCssDefs.js não encontrado. Usando valores padrão.', 'color: orange;');
}

export const sbFormLine = {
  props: {
    transparent: {
      type: Boolean,
      default: false  // Define se a linha será transparente
    },
    alignItems: {
      type: String,
      default: sbCssDefs.alignItems || 'flex-start',  // Define o alinhamento vertical dos inputs na linha
      validator: value => ['flex-start', 'flex-end', 'center', 'stretch'].includes(value)
    },
    justifyContent: {
      type: String,
      default: sbCssDefs.justifyContent || 'flex-start',  // Define a distribuição horizontal dos inputs na linha
      validator: value => ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].includes(value)
    },
    minHeight: {
      type: String,
      default: sbCssDefs.minHeight || '40px'  // Altura mínima da linha
    },
    heightWeight: {
      type: Number,
      default: sbCssDefs.heightWeight || 1  // Define o peso da linha para distribuição vertical
    },
    totalWeight: {
      type: Number,
      required: true  // Define a soma total dos pesos, que será usada para calcular a altura relativa
    },
    anchorPosition: {
      type: String,
      default: sbCssDefs.anchorPosition || 'flex-start',  // Define a posição da linha no layout vertical
      validator: value => ['flex-start', 'flex-end', 'center', 'stretch'].includes(value)
    },
    backgroundColor: {
      type: String,
      default: sbCssDefs.backgroundColor || '#f9f9f9'  // Cor de fundo da linha
    },
    padding: {
      type: String,
      default: '5px'  // Padding padrão
    },
    log: {
      type: Boolean,
      default: false  // Logs de depuração
    },
    debug: {
      type: Boolean,
      default: false  // Logs detalhados
    }
  },
  computed: {
    lineStyle() {
      return {
        display: 'flex',
        alignItems: this.alignItems,  // Alinhamento vertical
        justifyContent: this.justifyContent,  // Distribuição horizontal
        minHeight: this.minHeight,
        height: this.calculateHeight(),  // Altura calculada com base no peso
        backgroundColor: this.transparent ? 'transparent' : this.backgroundColor,  // Transparente ou cor de fundo
        order: this.anchorPosition,  // Âncora da linha no layout
        padding: this.padding  // Adicionando o padding da prop
      };
    }
  },
  methods: {
    calculateHeight() {
      const containerHeight = 400;  // Exemplo de altura do container, pode ser alterado para ser dinâmico
      const calculatedHeight = (this.heightWeight / this.totalWeight) * containerHeight;
      this.logMessage(`Altura calculada da linha: ${calculatedHeight}px`, 'log');
      return `${calculatedHeight}px`;
    },
    logMessage(message, type = 'log') {
      const styles = {
        log: 'color: blue;',
        debug: 'color: purple;'
      };

      if (this.debug) {
        console.debug(`%c${message}`, styles.debug);
      } else if (this.log) {
        console.log(`%c${message}`, styles.log);
      }
    }
  },
  mounted() {
    this.logMessage(`Componente sbFormLine montado com props:
      transparent: ${this.transparent},
      alignItems: ${this.alignItems},
      justifyContent: ${this.justifyContent},
      heightWeight: ${this.heightWeight},
      minHeight: ${this.minHeight},
      anchorPosition: ${this.anchorPosition},
      padding: ${this.padding},
      log: ${this.log ? 'enabled' : 'disabled'},
      debug: ${this.debug ? 'enabled' : 'disabled'}`, 'debug');
  },
  template: `
    <div class="sb-form-line" :style="lineStyle">
      <slot></slot>  <!-- Para renderizar os componentes filhos dentro da linha -->
    </div>
  `
};
