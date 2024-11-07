<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-title">{{ title }}</h2>
      <div v-if="title === 'Регистрация'">
        <form @submit.prevent="registerUser" class="registration-form">
          <div class="form-group">
            <label for="username">Имя пользователя: </label>
            <input type="text" id="username" v-model="username" required class="form-input" />
          </div>
          <div class="form-group">
            <label for="email">Email: </label>
            <input type="email" id="email" v-model="email" required class="form-input" />
          </div>
          <div class="form-group">
            <label for="password">Пароль: </label>
            <input type="password" id="password" v-model="password" required class="form-input" />
          </div>
          <button type="submit" class="submit-button">Зарегистрироваться</button>
        </form>
      </div>
      <p v-else>Тут будет(-ут) {{ title.toLowerCase() }}.</p>
    </div>
  </div>
</template>

<script>
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
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
      this.resetForm();
    },
    resetForm() {
      this.username = '';
      this.email = '';
      this.password = '';
    },
    registerUser() {
      // Здесь можно добавить логику для отправки данных на сервер
      console.log('Регистрация пользователя:', {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      this.closeModal(); // Закрываем модальное окно после регистрации
    },
  },
};
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

.registration-form {
  display: flex;
  flex-direction: column;

}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
</style>
