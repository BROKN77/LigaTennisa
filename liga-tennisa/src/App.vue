<template> 
  <div id="app"> 
    
    <Navbar :isLoggedIn="isLoggedIn" @open-modal="showModal" /> 
    
    <Modal 
      :visible="isModalVisible" 
      :title="modalTitle" 
      :event="event"
      @close-modal="hideModal" 
      @login-success="handleLoginSuccess" 
    /> 
    <router-view />
    
  </div> 
</template> 
 
<script> 
import Navbar from './components/Navbar.vue' 
import Modal from './components/Modal.vue' 
 
export default { 
  name: 'App', 
  components: { 
    Navbar, 
    Modal,
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
      this.modalTitle = section; 
      this.isModalVisible = true; 
    }, 
    showModal1(event) { // Параметр переименован для ясности
      this.event = event; // Сохраняем событие
      this.modalTitle = event.tournament_name; // Пример использования названия турнира как заголовка
      this.isModalVisible = true; 
    }, 
    hideModal() { 
      this.isModalVisible = false; 
    }, 
    handleLoginSuccess() { 
        this.isLoggedIn = true; // Обновление состояния входа
      }, 
  }, 
} 
</script>

<style>

</style>
