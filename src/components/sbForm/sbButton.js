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


export const sbButton = {
  props: {
    label: {
      type: String,
      required: false  // Label opcional para o botão
    },
    buttonType: {
      type: String,
      default: 'button',  // Tipo do botão: 'submit', 'reset', 'button'
      validator: value => ['submit', 'reset', 'button'].includes(value)
    },
    formTarget: {
      type: String,
      required: false  // O alvo do formulário, usado quando o buttonType for 'submit'
    },
    widthPercent: {
      type: [String, Number],
      default: sbCssDefs.widthPercent || 100  // Percentual de largura do botão
    },
    borderRadius: {
      type: String,
      default: sbCssDefs.borderRadius || '4px'  // Bordas arredondadas
    },
    backgroundColor: {
      type: String,
      default: sbCssDefs.backgroundColor || '#444'  // Cor de fundo do botão
    },
    foregroundColor: {
      type: String,
      default: sbCssDefs.foregroundColor || '#fff'  // Cor do texto do botão
    },
    padding: {
      type: String,
      default: sbCssDefs.padding || '10px'  // Espaçamento interno do botão
    },
    log: {
      type: [Boolean, String, Number],
      default: false  // Logs de depuração
    },
    debug: {
      type: [Boolean, String, Number],
      default: false  // Logs detalhados
    }
  },
  computed: {
    buttonStyle() {
      return {
        width: this.addPxIfNeeded(this.widthPercent + '%'),
        borderRadius: this.borderRadius,
        backgroundColor: this.backgroundColor,
        color: this.foregroundColor,
        border: '1px solid ' + this.backgroundColor,
        padding: this.padding,
        cursor: 'pointer',
        textAlign: 'center'
      };
    }
  },
  methods: {
    handleClick(event) {
      if (this.buttonType === 'submit' && this.formTarget) {
        const form = document.getElementById(this.formTarget);
        if (form) {
          this.logMessage(`Formulário ${this.formTarget} será submetido.`, 'log');
          form.submit();  // Submete o formulário associado ao formTarget
        } else {
          this.logMessage(`Formulário com id ${this.formTarget} não encontrado.`, 'warn');
        }
      } else {
        this.logMessage('Botão foi clicado.', 'log');
      }
    },
    logMessage(message, type = 'log') {
      const styles = {
        log: 'color: blue;',
        warn: 'color: orange;',
        debug: 'color: purple;'
      };

      if (this.coerceBoolean(this.debug)) {
        console.debug(`%c${message}`, styles.debug);
      } else if (this.coerceBoolean(this.log)) {
        console.log(`%c${message}`, styles.log);
      }
    },
    addPxIfNeeded(value) {
      return typeof value === 'number' ? `${value}px` : value;
    },
    coerceBoolean(value) {
      // Converte valores como "1", "0", "true", "false" para booleano
      return value === true || value === 'true' || value === 1;
    }
  },
  mounted() {
    this.logMessage(`Componente sbButton montado com props: 
      label: ${this.label}, 
      buttonType: ${this.buttonType}, 
      formTarget: ${this.formTarget || 'N/A'}, 
      log: ${this.log ? 'enabled' : 'disabled'},
      debug: ${this.debug ? 'enabled' : 'disabled'}`, 'debug');
  },
  template: `
    <button 
      :type="buttonType" 
      :style="buttonStyle"
      @click="handleClick">
      {{ label || 'Enviar' }}
    </button>
  `
};
