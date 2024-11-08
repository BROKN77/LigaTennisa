<template>
  <nav class="navbar">
    <div class="logo">ЛИГА ТЕННИСА</div>
    <ul class="nav-links">
      <li><a href="#">Главная</a></li>
      <li><a href="#">Для участников</a></li>
      <li>
        <a href="#" @click.prevent="openModal('Заявки')">Для организаторов</a>
      </li>
      <li><a href="#">Результаты</a></li>
      <li>
        <a href="#" @click.prevent="openModal('Контакты')">Контакты</a>
      </li>
      <li>
        <a href="#" @click.prevent="openModal('Вход')">Вход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
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
  background-color: #246d20;
  padding: 1rem 2rem;
  margin: 0;
}

.logo {
  font-size: 1.5rem;
  color: #fff;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}


.nav-links a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #7ee6ee;
}

li:not(:last-child) {
  margin-right: 15px;
}
</style>
