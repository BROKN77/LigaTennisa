<template>
  <nav class="navbar">
    <div class="logo">Лига тенниса</div>
    <ul class="nav-links">
      <li><a href="#" >Список событий</a></li>
      <li><a href="#" @click.prevent="openModal('Заявки')">Подать заявку на проведение</a></li>
      <li><a href="#" >Статистика</a></li>
      <li><a href="#" @click.prevent="openModal('Регистрация')">Регистрация</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "MainNavbar",
  methods: {
    openModal(section) {
      this.$emit('open-modal', section);
    },
  },
};
</script>

  <style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #083a07ab;
    padding: 1rem 2rem;
  }

  .logo {
    font-size: 1.5rem;
    color: #fff;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 1rem;
  }

  .nav-links li {
    text-transform: uppercase;
  }

  .nav-links a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav-links a:hover {
    color: #ffa500;
  }

  li:not(:last-child) { 
    margin-right: 15px;  
  }
  </style>
  