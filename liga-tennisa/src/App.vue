<template>
  <div id="app">
    <Navbar :isLoggedIn="isLoggedIn" @open-modal="showModal" />
    <Modal
      :visible="isModalVisible"
      :title="modalTitle"
      @close-modal="hideModal"
      @login-success="handleLoginSuccess"
    />
    <div class="main-content">
      <News />
      <EventCalendar @open-modal="showModal" />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Modal from './components/Modal.vue'
import EventCalendar from './components/EventCalendar.vue'
import News from './components/News.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Modal,
    EventCalendar,
    News,
  },
  data() {
    return {
      isModalVisible: false,
      modalTitle: '',
      isLoggedIn: false,
    }
  },
  methods: {
    showModal(section) {
      this.modalTitle = section
      this.isModalVisible = true
    },
    hideModal() {
      this.isModalVisible = false
    },
    handleLoginSuccess() {
      this.isLoggedIn = true // Update logged-in state
    },
  },
}
</script>

<style>
body,
html {
  margin: 0;
  background-color: #f0f0f0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f0f0;
  height: 100%;
  margin: 0;
  opacity: 0;
  animation: ani 1.5s forwards;
}

.main-content {
  display: flex; /* Устанавливаем флекс-контейнер для размещения календаря и новостей рядом */
}

@keyframes ani {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
