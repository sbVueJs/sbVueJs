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

export const sbFormLine = {
  props: {
    transparent: {
      type: [Boolean, String, Number],
      default: false,
      validator: value => [true, false, 'true', 'false', 0, 1].includes(value),
    },
    horizontalAnchor: {
      type: String,
      default: 'left',
      validator: value => ['left', 'center', 'right'].includes(value)
    },
    verticalAnchor: {
      type: String,
      default: 'top',
      validator: value => ['top', 'middle', 'bottom'].includes(value)
    },
    justify: {
      type: String,
      default: 'start',
      validator: value => ['start', 'end', 'center', 'space-between', 'space-around'].includes(value)
    },
    heightWeight: {
      type: [String, Number],
      default: '1' // Peso da altura, default para 1
    },
    minHeight: {
      type: [String, Number],
      default: '40' // Altura mínima da linha
    },
    backgroundColor: {
      type: String,
      default: '#f9f9f9'
    },
    padding: {
      type: String,
      default: '5px'
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
  computed: {
    lineStyle() {
      return {
        flexGrow: Number(this.heightWeight), // Flex grow baseado no peso individual
        display: 'flex',
        justifyContent: this.justifyContentValue,
        alignItems: this.verticalAlignValue,
        backgroundColor: this.isTransparent ? 'transparent' : this.backgroundColor,
        padding: this.padding,
        minHeight: this.addPxIfNeeded(this.minHeight), // Adicionar "px" ao minHeight se necessário
      };
    },
    justifyContentValue() {
      // Mapeia a distribuição de justify para o CSS correto
      const justifyMap = {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        'space-between': 'space-between',
        'space-around': 'space-around'
      };
      return justifyMap[this.justify];
    },
    verticalAlignValue() {
      // Define o alinhamento vertical com base no valor passado para verticalAnchor
      const verticalMap = {
        top: 'flex-start',
        middle: 'center',
        bottom: 'flex-end'
      };
      return verticalMap[this.verticalAnchor];
    },
    isTransparent() {
      return ['true', true, 1].includes(this.transparent);
    }
  },
  methods: {
    addPxIfNeeded(value) {
      // Se o valor é um número, adiciona "px", caso contrário, retorna o valor como está
      return typeof value === 'number' ? `${value}px` : value;
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
      horizontalAnchor: ${this.horizontalAnchor},
      verticalAnchor: ${this.verticalAnchor},
      justify: ${this.justify},
      heightWeight: ${this.heightWeight},
      minHeight: ${this.minHeight},
      padding: ${this.padding},
      log: ${this.log ? 'enabled' : 'disabled'},
      debug: ${this.debug ? 'enabled' : 'disabled'}`, 'debug');
  },
  template: `
    <div class="sb-form-line" :style="lineStyle">
      <slot></slot>
    </div>
  `
};
