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
    methods: {
    handleEventClick(event) {
      this.$emit('open-modal', event.title);
    },
  },
};
</script>

<style scoped>
.event-calendar {
  width: 500px;
  height: 500px;
  font-size: 12px;

}
</style>
