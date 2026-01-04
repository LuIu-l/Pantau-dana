# Contributing to Pantau Desa

Terima kasih atas minat Anda untuk berkontribusi pada Pantau Desa! 🎉

## 📋 Daftar Isi

- [Code of Conduct](#code-of-conduct)
- [Cara Berkontribusi](#cara-berkontribusi)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

Dengan berpartisipasi dalam proyek ini, Anda setuju untuk mematuhi Code of Conduct kami:

- Gunakan bahasa yang inklusif dan ramah
- Hormati sudut pandang dan pengalaman yang berbeda
- Terima kritik yang konstruktif dengan baik
- Fokus pada apa yang terbaik untuk komunitas
- Tunjukkan empati terhadap anggota komunitas lainnya

## Cara Berkontribusi

### 🐛 Melaporkan Bug

1. Periksa [Issues](https://github.com/LuIu-l/Pantau-dana/issues) untuk memastikan bug belum dilaporkan
2. Buat issue baru dengan template bug report
3. Jelaskan langkah-langkah untuk mereproduksi bug
4. Sertakan screenshot jika memungkinkan

### 💡 Mengusulkan Fitur

1. Buka [Discussions](https://github.com/LuIu-l/Pantau-dana/discussions) untuk diskusi awal
2. Jelaskan fitur yang diusulkan dan use case-nya
3. Jika disetujui, buat issue dengan label `enhancement`

### 🔧 Kontribusi Kode

1. Fork repository
2. Buat branch dari `main`
3. Implementasikan perubahan
4. Tulis tests jika diperlukan
5. Submit Pull Request

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation

```bash
# Clone fork Anda
git clone https://github.com/YOUR_USERNAME/Pantau-dana.git
cd Pantau-dana

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Jalankan tests
npm test
```

### Project Structure

```
src/
├── components/     # Vue components
├── views/          # Route page components
├── router/         # Vue Router config
├── stores/         # Pinia stores
├── services/       # Business logic services
├── utils/          # Utility functions
├── data/           # Mock data
└── assets/         # Static assets
```

## Coding Guidelines

### Vue Components

```vue
<script setup>
// 1. Imports
import { ref, computed } from 'vue'

// 2. Props & Emits
const props = defineProps({
  title: String
})

const emit = defineEmits(['update'])

// 3. Reactive state
const count = ref(0)

// 4. Computed properties
const doubled = computed(() => count.value * 2)

// 5. Methods
function increment() {
  count.value++
}

// 6. Lifecycle hooks (if needed)
</script>

<template>
  <!-- Use semantic HTML -->
  <!-- Add ARIA attributes for accessibility -->
</template>

<style scoped>
/* Use CSS custom properties */
/* Mobile-first approach */
</style>
```

### JavaScript/TypeScript

- Gunakan `const` dan `let`, hindari `var`
- Prefer arrow functions untuk callbacks
- Gunakan optional chaining (`?.`) dan nullish coalescing (`??`)
- Tambahkan JSDoc comments untuk functions kompleks

### CSS

- Gunakan CSS custom properties (variables)
- Mobile-first responsive design
- BEM naming convention untuk class names
- Hindari !important

### Testing

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Hello' }
    })
    expect(wrapper.text()).toContain('Hello')
  })
})
```

## Commit Messages

Kami menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Perubahan dokumentasi
- `style`: Perubahan formatting (tidak mengubah logika)
- `refactor`: Refactoring kode
- `test`: Menambah atau memperbaiki tests
- `chore`: Maintenance tasks

### Examples

```
feat(bansos): add search by name feature
fix(report): resolve submission error on mobile
docs(readme): update installation instructions
test(validation): add tests for phone validation
```

## Pull Request Process

### Before Submitting

1. ✅ Code mengikuti coding guidelines
2. ✅ Semua tests pass (`npm test`)
3. ✅ Build berhasil (`npm run build`)
4. ✅ Commit messages mengikuti convention
5. ✅ Branch up-to-date dengan `main`

### PR Template

```markdown
## Description
[Jelaskan perubahan yang dilakukan]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
[Jelaskan bagaimana perubahan di-test]

## Screenshots (if applicable)
[Tambahkan screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
```

### Review Process

1. Maintainer akan review PR dalam 1-3 hari kerja
2. Jika ada perubahan yang diminta, lakukan update
3. Setelah approved, PR akan di-merge

## Questions?

Jika ada pertanyaan, silakan:
- Buka [Discussion](https://github.com/LuIu-l/Pantau-dana/discussions)
- Email ke info@pantaudesa.id

---

Terima kasih telah berkontribusi! 🙏
