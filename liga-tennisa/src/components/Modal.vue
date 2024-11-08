<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div v-if="title==='Вход'">
        <h2 class="modal-title">{{ isRegistering ? 'Регистрация':'Вход' }}</h2>
        <!-- Заголовок меняется в зависимости от формы -->
        <div v-if="!isRegistering">
          <!-- Форма входа -->
          <form @submit.prevent="loginUser" class="login-form">
            <div class="form-group">
              <label for="loginEmail">Email: </label><br />
              <input
                type="email"
                id="loginEmail"
                v-model="loginEmail"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="loginPassword">Пароль: </label><br />
              <input
                type="password"
                id="loginPassword"
                v-model="loginPassword"
                required
                class="form-input"
              />
            </div>
            <button type="submit" class="submit-button">Войти</button>
          </form>
          <div class="register-prompt">
            <p>Нет аккаунта?</p>
            <button @click="switchToRegister" class="register-button">
              Регистрация
            </button>
          </div>
        </div>
        <div v-if="isRegistering">
          <!-- Форма регистрации -->
          <form @submit.prevent="registerUser" class="registration-form">
            <div class="form-group">
              <label for="username">Имя пользователя: </label><br />
              <input
                type="text"
                id="username"
                v-model="username"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="email">Email: </label><br />
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="password">Пароль: </label><br />
              <input
                type="password"
                id="password"
                v-model="password"
                required
                class="form-input"
              />
            </div>
            <button type="submit" class="submit-button">
              Зарегистрироваться
            </button>
          </form>
          <div class="login-prompt">
            <p>Уже есть аккаунт?</p>
            <button @click="switchToLogin" class="login-button">Вход</button>
          </div>
        </div>
      </div>
      <div v-else-if="title==='Заявки'">
        <h2 class="modal-title">{{ title }}</h2>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MainModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isRegistering: false, // По умолчанию показываем форму входа
      username: '',
      email: '',
      password: '',
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.resetForm()
    },
    resetForm() {
      this.username = ''
      this.email = ''
      this.password = ''
      this.loginEmail = ''
      this.loginPassword = ''
    },
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3008/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        alert(response.data.message)
      } catch (error) {
        console.error(error)
        alert('Ошибка при регистрации')
      }
      this.closeModal() // Закрываем модальное окно после регистрации
    },
    loginUser() {
      console.log('Вход пользователя:', {
        email: this.loginEmail,
        password: this.loginPassword,
      })
      this.closeModal() // Закрываем модальное окно после входа
    },
    switchToLogin() {
      this.isRegistering = false // Переключаемся на форму входа
    },
    switchToRegister() {
      this.isRegistering = true // Переключаемся на форму регистрации
    },
  },
}
</script>

<style>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: ani 2.5s forwards;
}
@keyframes ani {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 350px;
  border-radius: 5px;
}
.modal-title {
  text-align: center; /* Центрирование заголовка */
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.registration-form,
.login-form {
  display: flex;
  flex-direction: column;
}
.form-group {
  margin-bottom: 15px;
  text-align: center;
}

.form-input {
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 250px;
  margin-top: 7px;
}
.form-input:focus {
  border-color: #007bff; /* Цвет рамки при фокусе */
}
.submit-button {
  padding: 10px;
  background-color: #007bff; /* Цвет кнопки */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #0056b3; /* Цвет кнопки при наведении */
}
.login-prompt,
.register-prompt {
  text-align: center; /* Центрирование текста и кнопки */
  margin-top: 15px; /* Отступ сверху */
}
.login-button,
.register-button {
  padding: 5px; /* Отступы для кнопок */
  background-color: #28a745; /* Цвет кнопки */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-button:hover,
.register-button:hover {
  background-color: #218838; /* Цвет кнопки при наведении */
}
</style>
