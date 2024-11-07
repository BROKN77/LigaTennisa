<template>
  <div id="app">
    <Navbar @open-modal="showModal" />
    <Modal
      :visible="isModalVisible"
      :title="modalTitle"
      @close-modal="hideModal"
    />
    <EventCalendar @open-modal="showModal" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import EventCalendar from './components/EventCalendar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Modal,
    EventCalendar,
  },
  data() {
    return {
      isModalVisible: false,
      modalTitle: '',
    };
  },
  methods: {
    showModal(section) {
      this.modalTitle = section;
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style>
body, html{
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
@keyframes ani {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
