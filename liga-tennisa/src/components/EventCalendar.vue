<template>
  <div class="event-calendar">
    <h2>Календарь событий</h2>
    <div class="events">
      <div
        class="event-card"
        v-for="event in events"
        :key="event.id"
        @click="openModal(event.tournament_name)" 
      >
        <h3>{{ event.tournament_name }}</h3>
        <p>{{ changeDate(event.date) }} {{ event.time }}</p>
        <p>Уровень турнира: <b>{{ event.tournament_level }}</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'EventCalendar',
  data() {
    return {
      events: [],
    };
  },
  
  created() {
    this.fetchEvents(); // Fetch events when the component is created
  },
  methods: {
    openModal(tournament_name) { // Adjusted parameter name for clarity
      this.$emit('open-modal', tournament_name);
    },
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:3008/api/events'); // Adjust URL as necessary
        this.events = response.data; // Assuming your API returns an array of events
        console.log(response);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    changeDate(date){
      return(moment(date).format("DD/MM/YYYY"));
    }
  },
};
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
  transition:
    transform 0.2s,
    box-shadow 0.2s;
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
