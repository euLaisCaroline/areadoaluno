<template>
  <div class="area">
    <div class="area__header content">
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="assets/imagens/favicon/apple-icon-57x57.png"
      />
      <img class="area__header__img" src="@/assets/logo-negativo.svg" />
      <router-link to="/" class="area__header__sair">Sair</router-link>
    </div>
    <h1 class="area__title content">Plataforma de Horas Complementares</h1>

    <table class="area__table content">
      <thead>
        <tr>
          <th>Nome do Evento</th>
          <th>Carga Horária do Evento</th>
          <th>Data do Evento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="evento in eventos" :key="evento.id">
          <td>{{ evento.nome }}</td>
          <td>{{ evento.horas }}</td>
          <td>{{ evento.data }}</td>
          <td>
            <a
              href="#"
              @click="(modalEditar = true), carregarInfo($event, evento)"
              ><img src="@/assets/lapis.png"
            /></a>
            <a href="#" @click="deletarEvento($event, evento.id)"
              ><img src="@/assets/excluir.png"
            /></a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="area__buttons content">
      <button @click="modal = true" class="area__buttons__adicionar">
        Adicionar Evento
      </button>
    </div>
    <Modal v-if="modal">
      <!-- v-if vai carregar o formulário para add um novo evento.-->
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__header__title">Cadastrar Novo Evento</h3>
          <a @click="modal = false" href="#"
            ><img src="@/assets/fechar.svg"
          /></a>
        </div>
        <form class="modal__form">
          <input
            type="text"
            placeholder="Nome do Evento"
            class="modal__form__input"
            v-model="nome"
          />
          <input
            type="text"
            placeholder="Carga Horária"
            class="modal__form__input"
            v-model="horas"
          />
          <input
            type="date"
            placeholder="Data do Evento"
            class="modal__form__input"
            v-model="data"
          />
          <button @click="addEvento" class="modal__form__btn">Adicionar</button>
        </form>
      </div>
    </Modal>
    <Modal v-if="modalEditar">
      <div class="modal">
        <div class="modal__header">
          <h3>Editar dados do Evento</h3>
          <a href="#" @click="modalEditar = false">
            <img src="@/assets/fechar.svg" />
          </a>
        </div>
        <form class="modal__form">
          <input
            type="text"
            placeholder="Nome do Evento"
            class="modal__form__input"
            v-model="editar.nome"
          />
          <input
            type="text"
            placeholder="Carga Horária"
            class="modal__form__input"
            v-model="editar.horas"
          />
          <input
            type="date"
            placeholder="Data do Evento"
            class="modal__form__input"
            v-model="editar.data"
          />
          <button class="modal__form__btn" @click="modalEditar = false">
            Editar
          </button>
        </form>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal";
import axios from "axios";
export default {
  data() {
    return {
      nome: "",
      horas: "",
      data: "",
      modal: false,
      modalEditar: false,
      eventos: [],
      editar: {
        nome: "",
        horas: "",
        data: "",
      },
    };
  },
  components: {
    Modal,
  },
  mounted() {
    this.carregarEventos();
  },
  methods: {
    async addEvento(e) {
      e.preventDefault();
      if (this.nome === "" || this.horas === "" || this.data === "") {
        alert("Todos os campos são obrigatórios!");
      } else {
        const { data } = await axios.post("http://localhost:3000/eventos", {
          nome: this.nome,
          horas: this.horas,
          data: this.data,
        });
        this.modal = false;
        this.carregarEventos();
        this.nome = "";
        this.horas = "";
        this.data = "";
      }
    },
    async editarEvento(e) {
      e.preventDefault();
      if (this.nome === "" || this.horas === "" || this.data === "") {
        alert("Todos os campos são obrigatórios!");
      } else {
        const { data } = await axios.put(
          `http://localhost:3000/eventos/${this.editar.id}`,
          {
            nome: this.nome,
            horas: this.horas,
            data: this.data,
          }
        );
        this.modalEditar = false;
        this.carregarEventos();
      }
    },
    async carregarEventos() {
      const { data } = await axios.get("http://localhost:3000/eventos");
      this.eventos = data;
    },
    async deletarEvento(e, id) {
      e.preventDefault();
      const { data } = await axios.delete(
        `http://localhost:3000/eventos/${id}`
      );
      this.carregarEventos();
    },
    carregarInfo(e, evento) {
      e.preventDefault();
      this.editar.id = evento.id;
      this.editar.nome = evento.nome;
      this.editar.horas = evento.horas;
      this.editar.data = evento.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
  width: 70%;
}
.area {
  display: flex;
  flex-direction: column;
  background: #212121;
  width: 100%;
  height: 100%;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    &__sair {
      color: #fff;
      text-decoration: none;
      cursor: pointer;
    }
  }
  &__title {
    color: #dfdbdb;
    margin: 10px auto 40px;
  }
  &__table {
    background: #303030;
    border-radius: 5px;
    border-collapse: collapse;
    thead {
      tr {
        th {
          padding: 10px 0;
          color: #dfdbdb;
          border-bottom: 1px solid #000;
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 10px 0;
          color: #dfdbdb;
          text-align: center;
        }
      }
    }
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    &__adicionar {
      border: 0;
      background: rgba(228, 171, 0, 0.7);
      border-radius: 5px;
      color: #fff;
      padding: 10px;
      width: 182px;
      margin: 10px;
      transition: 800ms;
      cursor: pointer;
    }
  }
}
.modal {
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &__title {
      color: #fff;
    }
  }
  &__form {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    &__editar {
      margin-right: 10px;
    }
    &__excluir {
      margin-right: 10px;
    }
    &__input {
      outline: 0;
      padding: 10px;
      width: calc(50% - 5px);
      margin-bottom: 10px;
      border-radius: 5px;
      border: 0;
      &:nth-child(1) {
        margin-right: 5px;
      }
      &:nth-child(3) {
        margin-right: 5px;
      }
    }
    &__btn {
      width: 100px;
      height: 40px;
      border: 0;
      border-radius: 5px;
      background: rgba(228, 171, 0, 0.7);
      font-weight: 500;
      color: #fff;
      cursor: pointer;
      outline: 0;
    }
  }
}
</style>
