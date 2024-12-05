<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div v-if="title === 'Вход'">
        <h2 class="modal-title">
          {{ isRegistering ? 'Регистрация' : 'Вход' }}
        </h2>
        <!-- Заголовок меняется в зависимости от формы -->
        <div v-if="!isRegistering">
          <!-- Форма входа -->
          <form @submit.prevent="loginUser" class="login-form">
            <div class="form-group">
              <label for="loginEmail">Email: </label>
              <input
                type="email"
                id="loginEmail"
                v-model="loginEmail"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="loginPassword">Пароль: </label>
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
              <label for="username">Имя пользователя: </label>
              <input
                type="text"
                id="username"
                v-model="username"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="email">Email: </label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="password">Пароль: </label>
              <input
                type="password"
                id="password"
                v-model="password"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="skillLevel">Уровень навыков: </label>
              <select
                id="skillLevel"
                v-model="skillLevel"
                required
                class="form-input"
              >
                <option value="">Выберите уровень</option>
                <option value="Новичок">Новичок</option>
                <option value="Любитель">Любитель</option>
                <option value="Профессионал">Профессионал</option>
              </select>
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
      <div v-else-if="title === 'Заявки'">
        <h2 class="modal-title">Заявка на проведение турнира</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="phone">Номер телефона организатора:</label>
            <input type="text" id="phone" v-model="form.phone" required />
          </div>

          <div class="form-group">
            <label for="email">Почта:</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>

          <div class="form-group">
            <label for="lastName">Фамилия:</label>
            <input type="text" id="lastName" v-model="form.lastName" required />
          </div>

          <div class="form-group">
            <label for="firstName">Имя:</label>
            <input
              type="text"
              id="firstName"
              v-model="form.firstName"
              required
            />
          </div>

          <div class="form-group">
            <label for="middleName">Отчество:</label>
            <input
              type="text"
              id="middleName"
              v-model="form.middleName"
              required
            />
          </div>

          <div class="form-group">
            <label for="date">Дата проведения:</label>
            <input type="date" id="date" v-model="form.date" required />
          </div>

          <div class="form-group">
            <label for="time">Время проведения:</label>
            <input type="time" id="time" v-model="form.time" required />
          </div>

          <div class="form-group">
            <label for="location">Место проведения:</label>
            <input type="text" id="location" v-model="form.location" required />
          </div>

          <div class="form-group">
            <label for="tournamentName">Название турнира:</label>
            <input
              type="text"
              id="tournamentName"
              v-model="form.tournamentName"
              required
            />
          </div>
          <div class="form-group">
            <label for="tournamentLevel">Уровень навыков: </label>
              <select
                id="tournamentLevel"
                v-model="form.tournamentLevel"
                required
                class="form-input"
              >
                <option value="">Выберите уровень</option>
                <option value="Новичок">Новичок</option>
                <option value="Любитель">Любитель</option>
                <option value="Профессионал">Профессионал</option>
                <option value="Мастер">Мастер</option>
              </select>
          </div>
          <button @click="submitApplication" type="submit">Отправить заявку</button>
        </form>
      </div>
      <div v-else-if="title === 'Профиль'">
        <h2 class="modal-title">{{ 'Ваш ' + title.toLowerCase() }}</h2>
        <div class="profile">
          <div class="inline-objects">
            <div
              class="image-holder"
              @mouseenter="hover = true"
              @mouseleave="hover = false"
            >
              <input
                type="file"
                accept="image/*"
                ref="fileInput"
                @change="uploadImage"
                style="display: none"
              />
              <img
                v-if="imageUrlProfile"
                :src="imageUrlProfile"
                alt="Profile Picture"
                class="profile-picture"
                @click="triggerFileInput"
              />
              <div v-else class="empty-circle" @click="triggerFileInput">
                <span v-if="hover" class="add-sign">+</span>
              </div>
            </div>
            <div class="block-text">
            <h3 class="username">Имя: {{ usernameProfile }}</h3>
            <p class="email">Почта: {{ emailProfile }}</p>
            <p class="skillLevel">
              <i>Ваши очки:
              {{ skillLevelProfile }}</i>
            </p>
            </div>
          </div>
        <button class="logout" @click="logoutUser">Выйти из профиля</button>
      </div>
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
      isRegistering: false,
      username: '',
      email: '',
      password: '',
      loginEmail: '',
      loginPassword: '',
      skillLevel: '',
      isLoggedIn: false,
      imageUrl: '',
      hover: false,
      usernameProfile: '',
      emailProfile: '',
      imageUrlProfile: '',
      skillLevelProfile: '',
      form: {
        phone: '',
        email: '',
        lastName: '',
        firstName: '',
        middleName: '',
        date: '',
        time: '',
        location: '',
        tournamentName: '',
      },
    }
  },
  mounted() {
    // Check if token exists in localStorage
    if (localStorage.getItem('token')) {
      this.$emit('login-success')
    }
    this.fetchUserData();
    
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
      this.skillLevel = ''
      this.loginEmail = ''
      this.loginPassword = ''
      this.form = {
        phone: '',
        email: '',
        lastName: '',
        firstName: '',
        middleName: '',
        date: '',
        time: '',
        location: '',
        tournamentName: '',
      };
    },
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3008/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          skillLevel: this.skillLevel,
        })
        alert(response.data.message)
        this.closeModal() // Close modal after registration
      } catch (error) {
        console.error(error)
        alert('Ошибка при регистрации')
      }
    },

    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3008/login', {
          email: this.loginEmail,
          password: this.loginPassword,
        })
        alert(response.data.message) // Show success message or token
        localStorage.setItem('token', response.data.token) // Store token
        this.isLoggedIn = true // Update login state
        this.token = localStorage.getItem('token')
        // Emit an event to notify parent of successful login
        this.$emit('login-success')
        // Decrypt the token and get user ID
        console.log(this.token);
        this.closeModal() // Close modal after login
        location.reload()
      } catch (error) {
        console.error(error)
        alert('Ошибка при входе. Проверьте ваши учетные данные.')
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click() // Trigger file input click
    },
    async uploadImage(event) {
      const file = event.target.files[0]
      const parseJwt = token => {
        try {
          return JSON.parse(atob(token.split('.')[1]))
        } catch (e) {
          return null
        }
      }
      this.token = localStorage.getItem('token')

      this.userId = parseJwt(this.token)
      console.log(this.userId.id)
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('userId', this.userId.id) // Add userId here

        try {
          const response = await axios.post(
            `http://localhost:3008/upload-image/${this.userId.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if necessary
              },
            },
          )

          this.imageUrl = response.data.imageUrl // Adjust this if needed based on your response
          alert('Image uploaded successfully!')
          location.reload();
        } catch (error) {
          console.error('Error uploading image:', error)
          alert('Failed to upload image.')
        }
      }
    },
    //Load picture to profile

    async fetchUserData() {
      try {
        const parseJwt = token => {
          try {
            return JSON.parse(atob(token.split('.')[1]))
          } catch (e) {
            return null
          }
        }

        this.token = localStorage.getItem('token')

        this.userId = parseJwt(this.token)
        console.log('User ID:', this.userId.id)

        const response = await fetch(
          `http://localhost:3008/api/user/${this.userId.id}`,
        ) // Замените '1' на фактический ID пользователя

        if (!response.ok) throw new Error('Network response was not ok')

        const data = await response.json()
        console.log(data)
        this.usernameProfile = data.username
        this.emailProfile = data.email
        this.skillLevelProfile = data.skill_level

        if (data.image !== null) {
          this.imageUrlProfile = data.image
            ? `data:image/jpeg;base64,${data.image}`
            : null // Исправлено
        } else {
          this.imageUrlProfile = null
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    switchToLogin() {
      this.isRegistering = false // Switch to login form
    },
    switchToRegister() {
      this.isRegistering = true // Switch to registration form
    },
    logoutUser() {
      localStorage.removeItem('token') // Clear token from localStorage
      this.isLoggedIn = false // Update login state
      this.imageUrl = ''
      location.reload()
    },
    async submitApplication() {
      try {
        const response = await axios.post('http://localhost:3008/submit-application', this.form);
        alert(response.data.message); // Show success message
        this.resetForm(); // Reset form after submission
        this.closeModal(); // Close modal after submission
      } catch (error) {
        console.error(error);
        alert('Ошибка при отправке заявки');
      }
    },
  },
}
</script>

<style>
.modal {
  position:fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: ani 2.5s forwards;
  margin-bottom: 100px;
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
  margin: 10% auto;
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
  margin-bottom: 0.5rem;
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
/* Image holder */
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inline-objects{
  display: inline-flex;
  padding-bottom: 5%;
}
.block-text{

}
.image-holder {
  position: relative;
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
  border-radius: 50%;
  border: 2px dashed #ccc; /* Style for empty circle */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
}

.empty-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f0f0f0; /* Background color for empty state */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-picture {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover; /* Ensures the image covers the circle */
}

.add-sign {
  font-size: 24px;
  color: #aaa; /* Color for the + sign */
}
.logout {
  background-color: #ff0000; /* Red color */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  padding: 15px 30px; /* Vertical and horizontal padding */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  transition: transform 0.2s ease; /* Smooth transition for size change */
}

.logout:hover {
  transform: scale(1.05); /* Slightly increase size on hover */
}

label {
  display: block;
  margin-bottom: 0.25rem; /* Уменьшение отступа под заголовком */
}
input {
  width: 100%;
  padding: 0.25rem; /* Уменьшение внутреннего отступа */
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.5rem;
  background-color: #23831e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #1a6414;
}
</style>
