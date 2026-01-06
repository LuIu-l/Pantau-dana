<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  testimonials: {
    type: Array,
    required: true
  },
  autoplayInterval: {
    type: Number,
    default: 5000
  }
})

const currentIndex = ref(0)
let intervalId = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.testimonials.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.testimonials.length - 1 
    : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetInterval()
}

const resetInterval = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  intervalId = setInterval(nextSlide, props.autoplayInterval)
}

onMounted(() => {
  intervalId = setInterval(nextSlide, props.autoplayInterval)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const renderStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}
</script>

<template>
  <section class="testimonial-section">
    <div class="container">
      <h2 class="section-title">Apa Kata Mereka?</h2>
      <p class="section-subtitle">Pengalaman nyata dari pengguna Pantau Desa</p>
      
      <div class="testimonial-slider">
        <div class="slider-container">
          <transition-group name="slide" tag="div" class="slides-wrapper">
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="testimonial.id"
              v-show="index === currentIndex"
              class="testimonial-card"
            >
              <div class="quote-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              <blockquote class="testimonial-quote">
                {{ testimonial.kutipan }}
              </blockquote>
              
              <div class="testimonial-rating">
                <span class="stars">{{ renderStars(testimonial.rating) }}</span>
              </div>
              
              <div class="testimonial-author">
                <img 
                  :src="testimonial.foto" 
                  :alt="testimonial.nama"
                  class="author-photo"
                  loading="lazy"
                />
                <div class="author-info">
                  <strong class="author-name">{{ testimonial.nama }}</strong>
                  <span class="author-title">{{ testimonial.jabatan }}</span>
                  <span class="author-location">{{ testimonial.lokasi }}</span>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        
        <!-- Navigation Arrows -->
        <button class="slider-arrow slider-arrow--prev" @click="prevSlide" aria-label="Previous testimonial">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button class="slider-arrow slider-arrow--next" @click="nextSlide" aria-label="Next testimonial">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
        
        <!-- Dots Navigation -->
        <div class="slider-dots">
          <button 
            v-for="(_, index) in testimonials" 
            :key="index"
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
            :aria-label="`Go to testimonial ${index + 1}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-section {
  padding: var(--spacing-3xl) 0;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-accent-50) 100%);
}

.section-title {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.testimonial-slider {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.slider-container {
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.slides-wrapper {
  position: relative;
  min-height: 350px;
}

.testimonial-card {
  position: absolute;
  inset: 0;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.quote-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-lg);
  color: var(--color-primary);
  opacity: 0.3;
}

.quote-icon svg {
  width: 100%;
  height: 100%;
}

.testimonial-quote {
  font-size: var(--font-size-lg);
  line-height: 1.7;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  font-style: italic;
}

.testimonial-rating {
  margin-bottom: var(--spacing-lg);
}

.stars {
  color: #FFC107;
  font-size: var(--font-size-xl);
  letter-spacing: 2px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.author-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-primary-100);
}

.author-info {
  text-align: left;
}

.author-name {
  display: block;
  font-weight: 600;
  color: var(--color-text-primary);
}

.author-title {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.author-location {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Navigation */
.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  color: var(--color-text-primary);
}

.slider-arrow:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.slider-arrow svg {
  width: 24px;
  height: 24px;
}

.slider-arrow--prev {
  left: -24px;
}

.slider-arrow--next {
  right: -24px;
}

@media (max-width: 900px) {
  .slider-arrow--prev {
    left: var(--spacing-sm);
  }
  
  .slider-arrow--next {
    right: var(--spacing-sm);
  }
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-border);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.dot.active {
  background: var(--color-primary);
  width: 32px;
  border-radius: var(--radius-full);
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
