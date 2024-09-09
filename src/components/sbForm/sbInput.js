let sbCssDefs = {};

try {
  sbCssDefs = require('./sbCssDefs.js');
  console.log('%c sbCssDefs.js carregado com sucesso.', 'color: green;');
} catch (error) {
  console.warn('%c sbCssDefs.js não encontrado. Usando valores padrão.', 'color: orange;');
}

export const sbInput = {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    },
    inputType: {
      type: String,
      default: 'text',
      validator: value => ['text', 'checkbox', 'radio', 'select', 'textarea', 'number', 'email'].includes(value)
    },
    groupName: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: sbCssDefs.labelPosition || 'top',
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    widthPercent: {
      type: Number,
      default: sbCssDefs.widthPercent || 100
    },
    minWidth: {
      type: String,
      default: sbCssDefs.minWidth || '100px'
    },
    borderRadius: {
      type: String,
      default: sbCssDefs.borderRadius || '4px'
    },
    margin: {
      type: String,
      default: sbCssDefs.margin || '10px'
    },
    resizeHorizontal: {
      type: Boolean,
      default: false // Desativa o redimensionamento horizontal por padrão
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
    containerStyle() {
      return {
        width: `${this.widthPercent}%`,
        display: 'flex',
        flexDirection: this.getFlexDirection(),
        alignItems: this.labelPosition === 'left' || this.labelPosition === 'right' ? 'center' : 'flex-start',
        justifyContent: 'space-between',
        minWidth: this.minWidth,
        marginBottom: this.margin
      };
    },
    labelStyle() {
      return {
        marginRight: this.labelPosition === 'left' ? '10px' : '0',
        marginBottom: this.labelPosition === 'top' ? '5px' : '0',
        order: this.labelPosition === 'right' || this.labelPosition === 'bottom' ? 1 : 0,
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#333'
      };
    },
    inputStyle() {
      return {
        width: this.inputType === 'checkbox' || this.inputType === 'radio' ? 'auto' : '100%',
        borderRadius: this.borderRadius,
        border: '1px solid #ccc',
        padding: '8px',
        boxSizing: 'border-box',
        resize: this.inputType === 'textarea' && !this.resizeHorizontal ? 'vertical' : 'both' // Controla o redimensionamento
      };
    }
  },
  methods: {
    getFlexDirection() {
      switch (this.labelPosition) {
        case 'top':
        case 'bottom':
          return 'column';
        case 'left':
        case 'right':
          return 'row';
      }
    },
    handleInput(event) {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      this.$emit('update:modelValue', value);
      this.logMessage(`Input value changed to: ${value}`);
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
    this.logMessage(`Componente sbInput montado com props: 
      label: ${this.label}, 
      inputType: ${this.inputType}, 
      placeholder: ${this.placeholder}, 
      widthPercent: ${this.widthPercent}%,
      log: ${this.log ? 'enabled' : 'disabled'}`);
  },
  template: `
    <div class="sb-input-container" :style="containerStyle">
      <label v-if="label" :style="labelStyle">{{ label }}</label>
      
      <input 
        v-if="inputType !== 'select' && inputType !== 'textarea'" 
        :type="inputType" 
        :value="modelValue" 
        :name="inputType === 'radio' ? groupName : null"  
        :style="inputStyle" 
        @input="handleInput"
        @change="handleInput"
      >

      <textarea 
        v-if="inputType === 'textarea'" 
        :value="modelValue" 
        :style="inputStyle" 
        @input="handleInput">
      </textarea>

      <select 
        v-if="inputType === 'select'" 
        :style="inputStyle" 
        @change="handleInput">
        <slot></slot> 
      </select>
    </div>
  `
};
