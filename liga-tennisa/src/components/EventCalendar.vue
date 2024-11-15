<template>
  <div class="event-calendar">
    <h2>Календарь событий</h2>
    <div class="events">
      <div 
        class="event-card" 
        v-for="event in events" 
        :key="event.id" 
        @click="openModal(event.title)"
      >
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }}</p>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCalendar',
  data() {
    return {
      events: [
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
        { id: 1, title: 'Событие 1', date: '18 ноября 2024', description: 'Первый отборочный тур' },
        { id: 2, title: 'Событие 2', date: '20 ноября 2024', description: 'Второй отборочный тур' },
        { id: 3, title: 'Событие 3', date: '29 ноября 2024', description: 'Чемпионат' },
      ]
    };
  },
  methods: {
    openModal(title) {
      this.$emit('open-modal', title);
    }
  }
}
</script>

<style scoped>
.event-calendar {
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Тень вокруг контейнера */
  border-radius: 10px; /* Скругление углов контейнера */
  margin: 20px auto; /* Центрирование контейнера */
  width: 30%;
  display: block;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.events {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Отступ между карточками */
}

.event-card {
  flex: 1 1 calc(33% - 20px); /* Три карточки в ряд с учетом отступов */
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.event-card h3 {
  margin: 0;
}

.event-card p {
  margin: 5px 0;
}
</style>
