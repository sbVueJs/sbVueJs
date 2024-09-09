export const sbFormArrayDb = {
  props: {
    arrayData: {
      type: Array,
      required: true, // O array de dados gerenciado
    },
    itemStructure: {
      type: Object,
      required: true, // Estrutura do item (os campos e valores padrões)
    },
    log: {
      type: Boolean,
      default: false, // Habilita logs
    },
  },
  data() {
    return {
      currentItem: Object.assign({}, this.itemStructure), // Item atual para edição/adicionamento
      currentIndex: null, // Índice do item sendo editado
    };
  },
  methods: {
    // Adiciona ou edita um item no array
    saveItem() {
      if (this.currentIndex === null) {
        // Adiciona novo item
        this.currentItem.id = this.arrayData.length + 1; // Gera ID único
        this.arrayData.push(Object.assign({}, this.currentItem));
        this.logMessage(`Item adicionado: ${JSON.stringify(this.currentItem)}`, 'log');
      } else {
        // Edita item existente
        this.$set(this.arrayData, this.currentIndex, Object.assign({}, this.currentItem));
        this.logMessage(`Item editado: ${JSON.stringify(this.currentItem)}`, 'log');
      }
      this.resetForm(); // Reseta o formulário após salvar
    },
    // Prepara o item para edição
    editItem(index) {
      this.currentIndex = index;
      this.currentItem = Object.assign({}, this.arrayData[index]);
      this.logMessage(`Editando item: ${JSON.stringify(this.currentItem)}`, 'log');
    },
    // Remove o item do array
    removeItem(index) {
      this.arrayData.splice(index, 1);
      this.logMessage(`Item removido no índice ${index}`, 'warn');
      this.resetForm();
    },
    // Reseta o formulário
    resetForm() {
      this.currentItem = Object.assign({}, this.itemStructure);
      this.currentIndex = null;
    },
    logMessage(message, type = 'log') {
      if (this.log) {
        console[type](message);
      }
    }
  },
  template: `
    <div>
      <!-- Formulário -->
      <form @submit.prevent="saveItem">
        <slot></slot> <!-- Campos de formulário passados via slot -->
        <button type="submit">{{ currentIndex === null ? 'Adicionar' : 'Salvar' }}</button>
        <button type="button" @click="resetForm">Cancelar</button>
      </form>

      <!-- Lista de itens -->
      <table>
        <thead>
          <tr>
            <th v-for="(value, key) in itemStructure" v-if="key !== 'id'">{{ key }}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in arrayData" :key="item.id">
            <td v-for="(value, key) in item" v-if="key !== 'id'">{{ value }}</td>
            <td>
              <button @click="editItem(index)">Editar</button>
              <button @click="removeItem(index)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
};
