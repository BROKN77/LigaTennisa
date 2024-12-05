<template>
  <div class="news-container">
    <h2>Новости тенниса</h2>
    <div v-for="(article, index) in articles" :key="index" class="news-item">
      <img
        :src="article.urlToImage"
        alt="News Image"
        class="news-image"
        v-if="article.urlToImage"
      />
      <div class="news-content">
        <a :href="article.url" target="_blank" class="news-title">{{ article.title }}</a>
        <p class="news-description">{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      articles: [],
      intervalId: null, // Для хранения идентификатора интервала
    }
  },
  mounted() {
    this.fetchNews(); // Первоначальная загрузка новостей
    this.startAutoRefresh(); // Запуск автоматического обновления
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Остановка интервала при уничтожении компонента
  },
  methods: { 
  async fetchNews() { 
    try { 
      const response = await fetch( 
        'https://newsapi.org/v2/everything?q=tennis&language=ru&apiKey=effa889e785844bf8b5d78145d857cd4' 
      ); 
      const data = await response.json(); 
      // Сортируем статьи по дате (от новых к старым) 
      this.articles = data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)); 
    } catch (error) { 
      console.error('Ошибка при загрузке новостей:', error); 
    } 
  }, 

  startAutoRefresh() { 
    this.intervalId = setInterval(() => { 
      this.fetchNews(); // Обновление новостей каждые 5 минут (300000 мс) 
    }, 300000); // Задайте нужный интервал 
  } 
},
}

</script>

<style scoped>
.news-container {
  margin: 20px auto; /* Центрирование контейнера */
  width: 1200px; /* Ширина контейнера */
  padding: 20px; /* Внутренние отступы */
  background-color: #ffffff; /* Фоновый цвет контейнера */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Тень вокруг контейнера */
  border-radius: 10px; /* Скругление углов контейнера */
}

.news-container h2 {
  font-size: 24px;
  text-align: center; /* Центрирование заголовка */
}

.news-item {
  display: flex;
  align-items: flex-start;
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.news-image {
  width: 100px; /* Ширина изображения */
  height: auto; /* Автоматическая высота для сохранения пропорций */
  margin-right: 15px; /* Отступ между изображением и текстом */
  border-radius: 5px; /* Скругление углов изображения */
}

.news-content {
  flex-grow: 1; /* Позволяет блоку с текстом занимать оставшееся пространство */
}

.news-title {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
}

.news-title:hover {
  text-decoration: underline;
}

.news-description {
  margin-top: 5px;
  color: #555; /* Цвет текста описания */
}
</style>
