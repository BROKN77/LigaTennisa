<template> 
    <div id="app"> 
        <Modal 
      :visible="isModalVisible" 
      :title="modalTitle" 
      :event="event"
      @close-modal="hideModal" 
      @login-success="handleLoginSuccess" 
        /> 
      <div class="main-content"> 
        <News /> 
        <EventCalendar @open-modal="showModal1" /> 
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
      Modal, 
      EventCalendar, 
      News, 
    }, 
    data() { 
      return { 
        isModalVisible: false, 
        modalTitle: '', 
        event: null, // Изменено на null
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
  