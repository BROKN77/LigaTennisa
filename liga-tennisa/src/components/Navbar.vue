<template>
  <nav class="navbar">
    <img class="image" src="../images/header-logo.png" alt="" />
    <div class="logo">ЛИГА ТЕННИСА</div>

    <ul class="nav-links">
      <li><router-link to="/">Главная</router-link></li> 
      <li><router-link to="/for-participants">Для участников</router-link></li>
      <li>
        <a href="#" @click.prevent="openModal('Заявки')">Для организаторов</a>
      </li>
      <li><router-link to="/results">Результаты</router-link></li> 
      <li>
        <a href="#" @click.prevent="openModal('Контакты')">Контакты</a>
      </li>
      <li v-if="isLoggedIn">
        <a href="#" @click.prevent="openModal('Профиль')">Профиль</a>
      </li>
      <li v-else>
        <a href="#" @click.prevent="openModal('Вход')">Вход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openModal(section) {
      this.$emit('open-modal', section)
    },
  },
}
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #23831e;
  padding: 0.75rem;
  margin: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.5rem;
  color: #fff;
  margin-right: 30%;
}
.image {
  width: 35px;
  height: 35px;
  margin-left: 2%;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  font-weight: 700;
  font-size: 18px;
  margin-right: 50px;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links router-link{
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links router-link:hover{
  color: #52d182;
}

.nav-links a:hover {
  color: #52d182;
}

li:not(:last-child) {
  margin-right: 15px;
}
</style>
