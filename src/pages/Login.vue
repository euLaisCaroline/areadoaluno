<template>
  <div class="container">
    <div class="container__login">
      <div class="container__login__logo">
        <img
          src="@/assets/logo-negativo.svg"
          class="container__login__logo__img"
        />
      </div>
      <form @submit.prevent="submit" class="container__login__form">
        <input
          type="text"
          placeholder="Seu RGM ou CPF"
          class="container__login__form__input"
          v-model="rgm"
        />
        <input
          type="password"
          placeholder="Senha"
          class="container__login__form__input"
          v-model="senha"
        />

        <div class="container__login__form__buttons">
          <router-link to="" class="container__login__form__buttons__area">
            BLACKBOARD
          </router-link>
          <button type="submit" class="container__login__form__buttons__area">
            ÁREA DO ALUNO
          </button>
        </div>
      </form>

      <a href="" class="container__login__reset">
        esqueceu ou deseja efetuar o reset da sua senha?</a
      >
      <a href="" class="container__login__reset">esqueceu o seu RGM?</a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      rgm: "",
      senha: "",
    };
  },
  methods: {
    async submit() {
      const { data } = await axios.get("http://localhost:3000/aluno", {
        params: {
          rgm: this.rgm,
          senha: this.senha,
        },
      });
      if (data.length > 0) {
        alert("Logando");
        this.$router.push("/area");
      } else {
        alert("Todos os campos são obrigatórios.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  background: #000;
  justify-content: center;
  align-items: center;
  &__login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 27%;
    height: 100%;
    margin: 5px;
    &__logo {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    &__form {
      display: flex;
      flex-direction: column;
      margin-top: 100px;
      &__input {
        outline: 0;
        border: none;
        border-bottom: 1px solid #fff;
        color: #fff;
        background: transparent;
        padding: 15px 10px;
        margin: 5px 0;
        font-size: 15px;
        font-weight: 500;
      }
      &__buttons {
        display: flex;
        justify-content: space-between;
        margin: 30px 2px;
        &__area {
          border: 0;
          padding: 6px 15px;
          text-decoration: none;
          border-radius: 3px;
          background: rgba(230, 172, 0, 0.702);
          color: #fff;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: 800ms;
          outline: 0;
        }
      }
    }
    &__reset {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      padding: 12px 16px;
      text-decoration: none;
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: 800ms;
      outline: 0;
    }
  }
}
</style>
