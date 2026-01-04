<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  animate: {
    type: Boolean,
    default: false
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 2000
  },
  decimals: {
    type: Number,
    default: 0
  }
})

const displayValue = ref(0)
let animationFrame = null

const animateValue = () => {
  const startTime = performance.now()
  const startValue = 0
  const endValue = props.value
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Easing function: easeOutExpo
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    
    displayValue.value = startValue + (endValue - startValue) * easeProgress
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }
  
  animationFrame = requestAnimationFrame(animate)
}

watch(() => props.animate, (newVal) => {
  if (newVal) {
    animateValue()
  }
}, { immediate: true })

onMounted(() => {
  if (props.animate) {
    animateValue()
  } else {
    displayValue.value = props.value
  }
})

const formattedValue = () => {
  const value = Math.round(displayValue.value * Math.pow(10, props.decimals)) / Math.pow(10, props.decimals)
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals
  })
}
</script>

<template>
  <span class="animated-counter">
    <span class="counter-prefix" v-if="prefix">{{ prefix }}</span>
    <span class="counter-value">{{ formattedValue() }}</span>
    <span class="counter-suffix" v-if="suffix">{{ suffix }}</span>
  </span>
</template>

<style scoped>
.animated-counter {
  display: inline-flex;
  align-items: baseline;
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.counter-prefix,
.counter-suffix {
  font-size: 0.7em;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.counter-prefix {
  margin-right: 0.1em;
}

.counter-suffix {
  margin-left: 0.1em;
}

.counter-value {
  font-variant-numeric: tabular-nums;
}
</style>
