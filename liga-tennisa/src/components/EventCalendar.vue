<template>
  <div class="event-calendar">
    <vue-cal
      :events="events"
      @event-click="handleEventClick"
      :disabled-days="disabledDays"
      :event-color="eventColor"
      :editable="true"
      locale="ru"
    />
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  name: 'EventCalendar',
  components: {
    VueCal,
  },
  data()  {
    return{
      events: [
      {
          start: new Date(2024, 10, 8, 10, 0), // October 1, 2023, 10:00 AM
          end: new Date(2024, 10, 8, 12, 0),   // October 1, 2023, 12:00 PM
          title: 'Событие',
          color: '#FF5733', // Custom color for this event
        },
      ]
    }
  },
  methods: {
    handleEventClick(event) {
      this.$emit('open-modal', event.title)
    },
  },
}
</script>

<style scoped>
.event-calendar {
  width: 700px;
  height: 700px;
  font-size: 12px;
  margin-left:3%;
  margin-top:5%;
}
</style>
