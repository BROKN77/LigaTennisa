<template>
  <div class="news-carousel">
    <h2>Новости</h2>
    <div class="carousel">
         <div class="carousel-content" :style="{ transform: 'translateX(-' + currentIndex + ' * 100%)' }">
        <div v-for="(newsItem, index) in news" :key="index" class="news-item">
          <h3>{{ newsItem.title }}</h3>
          <p>{{ newsItem.description }}</p>
        </div>
      </div>
    </div>
    <div class="navigation">
      <button @click="prevNews" :disabled="currentIndex === 0">◀</button>
      <button @click="nextNews" :disabled="currentIndex === news.length - 1">▶</button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'News',
  data() {
    return {
      currentIndex: 0,
      news: [
        { title: 'Новость 1', description: 'Описание новости 1' },
        { title: 'Новость 2', description: 'Описание новости 2' },
        { title: 'Новость 3', description: 'Описание новости 3' },
      ],
    };
  },
  methods: {
    nextNews() {
      if (this.currentIndex < this.news.length - 1) {
        this.currentIndex++;
        console.log('Current Index (Next):', this.currentIndex);
      }
    },
    prevNews() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        console.log('Current Index (Prev):', this.currentIndex);
      }
    },
  },
};
</script>

<style scoped>
.news-carousel {
  width: 600px; /* Ширина карусели */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden; /* Скрываем переполнение */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.carousel {
  overflow: hidden; /* Скрываем переполнение */
}

.carousel-content {
  display: flex;
  transition: transform 0.5s ease; /* Плавный переход */
}

.news-item {
  min-width: 100%; /* Каждое новостное сообщение занимает всю ширину */
  box-sizing: border-box;
  padding: 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
}

.news-item h3 {
  margin: 0;
}

.news-item p {
  color: #555;
}

.navigation {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
