<template>
  <div class="event-calendar">
    <vue-cal
      :events="events"
      @event-click="handleEventClick"
      :disabled-days="disabledDays"
      :event-color="eventColor"
      :editable="true"
      locale = "ru"
    />
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'EventCalendar',
  components: {
    VueCal,
  },
  data() {
    return {
      events: [
        {
          start: '2024-12-1 10:00',
          end: '2024-12-1 12:00',
          title: 'Соревнования1',
        },
        {
          start: '2024-11-20 14:00',
          end: '2024-11-21 18:30',
          title: 'Соревнования2',
        },
        {
          start: '2024-11-15 09:00',
          end: '2024-11-16 11:00',
          title: 'Соревнования3',
        },
      ],
    };
  },
  methods: {
    handleEventClick(event) {
      this.$emit('open-modal', event.title);
    },
  },
};
</script>

<style scoped>
.event-calendar {
  max-width: 800px;
  margin: auto;
}
</style>
