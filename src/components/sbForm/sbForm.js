import { sbFormLine } from './sbFormLine.js';
import { sbButton } from './sbButton.js';
import { sbInput } from './sbInput.js';  // Importando sbInput

export const sbForm = {
  components: {
    'sb-form-line': sbFormLine,
    'sb-button': sbButton,
    'sb-input': sbInput  // Registrando sbInput
  },
  props: {
    modelValue: Object, // Dados do formulário
  },
  data() {
    return {
      currentItem: { ...this.modelValue },  // Clonando modelValue para currentItem
      arrayData: [],  // Definindo arrayData como um array vazio
      editIndex: null  // Índice do item que está sendo editado
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.currentItem = { ...newValue };  // Atualiza o currentItem quando modelValue muda
      }
    }
  },
  methods: {
    saveItem() {
      console.log('Tentando salvar item:', this.currentItem);

      if (!this.currentItem.nome || !this.currentItem.idade) {
        console.log('Campos vazios, item não foi adicionado:', this.currentItem);
        return;
      }

      if (this.editIndex === null) {
        // Adicionando novo item
        this.arrayData.push({ ...this.currentItem });
        console.log('Item adicionado:', this.currentItem);
      } else {
        // Editando item existente
        this.arrayData[this.editIndex] = { ...this.currentItem };
        console.log('Item atualizado:', this.currentItem);
        this.editIndex = null;  // Resetando o índice de edição
      }

      this.resetForm();  // Limpar o formulário após salvar
    },
    editItem(index) {
      // Carregar item para edição
      this.currentItem = { ...this.arrayData[index] };
      this.editIndex = index;  // Guardar o índice do item que está sendo editado
      console.log('Editando item no índice:', index);
    },
    removeItem(index) {
      // Remover item do array
      this.arrayData.splice(index, 1);
      console.log('Item removido no índice:', index);
    },
    resetForm() {
      this.currentItem = { nome: '', idade: '' };  // Reseta os campos do formulário
      this.editIndex = null;  // Resetar o índice de edição para null
    }
  },
  template: `
  <div class="sb-form-container">
    <div class="sb-form-content">
      <sb-form-line>
        <sb-input label="Nome Completo" v-model="currentItem.nome"></sb-input>
      </sb-form-line>

      <sb-form-line>
        <sb-input label="Idade" v-model="currentItem.idade"></sb-input>
      </sb-form-line>

      <sb-form-line style="justify-content: flex-start;">
        <sb-button label="Salvar" @click="saveItem" style="min-width: 30px; max-width: 20%;"></sb-button>
        <sb-button label="Cancelar" @click="resetForm" style="min-width: 30px; max-width: 20%; margin-left: 10px;"></sb-button>
      </sb-form-line>
    </div>

    <!-- Tabela com dados -->
    <div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 2px solid #888; background-color: #eaeaea;">
        <thead style="background-color: #343a40; color: white;">
          <tr>
            <th v-for="key in Object.keys(modelValue)" :key="key" style="text-align: left; padding: 5px; border-bottom: 2px solid #ccc; resize: horizontal; overflow: auto; cursor: col-resize;">{{ key }}</th>
            <th style="width: 10%; text-align: right; padding: 5px;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="arrayData.length === 0">
            <td colspan="3" style="text-align: center; padding: 10px;">Nenhum item cadastrado</td>
          </tr>
          <tr v-for="(item, index) in arrayData" :key="index">
            <td v-for="key in Object.keys(modelValue)" :key="key" style="padding: 5px; border-bottom: 2px solid #ddd; resize: horizontal; overflow: auto; cursor: col-resize;">{{ item[key] }}</td>
            <td style="text-align: right; padding: 5px;">
              <div style="display: flex; justify-content: flex-end; gap: 3px;">
                <sb-button title="Editar" @click="editItem(index)" style="width: 30px; height: 30px; background-color: lightgray; color: white; border: none; cursor: pointer;" v-tooltip="'Editar'">
                  <i class="fa fa-pencil"></i> <!-- Ícone de lápis para editar -->
                </sb-button>
                <sb-button title="Excluir" @click="removeItem(index)" style="width: 30px; height: 30px; background-color: black; color: white; border: none; cursor: pointer;" v-tooltip="'Excluir'">
                  <i class="fa fa-trash"></i> <!-- Ícone de lixeira para excluir -->
                </sb-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`
};
