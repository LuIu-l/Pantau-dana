import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue'

describe('SkeletonLoader Component', () => {
  it('renders text skeleton by default', () => {
    const wrapper = mount(SkeletonLoader)
    
    expect(wrapper.find('.skeleton-wrapper').exists()).toBe(true)
    expect(wrapper.find('.skeleton-text').exists()).toBe(true)
  })

  it('renders correct number of lines for text skeleton', () => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        variant: 'text',
        lines: 5
      }
    })
    
    const lines = wrapper.findAll('.skeleton-line')
    expect(lines).toHaveLength(5)
  })

  it('renders avatar skeleton', () => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        variant: 'avatar',
        size: '60px'
      }
    })
    
    const avatar = wrapper.find('.skeleton-avatar')
    expect(avatar.exists()).toBe(true)
    // Avatar should render correctly with the variant
    expect(wrapper.classes()).toContain('skeleton-avatar')
  })

  it('renders card skeleton', () => {
    const wrapper = mount(SkeletonLoader, {
      props: { variant: 'card' }
    })
    
    expect(wrapper.find('.skeleton-card').exists()).toBe(true)
    expect(wrapper.find('.skeleton-card-header').exists()).toBe(true)
    expect(wrapper.find('.skeleton-card-body').exists()).toBe(true)
  })

  it('renders table skeleton with correct rows and columns', () => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        variant: 'table',
        rows: 3,
        columns: 4
      }
    })
    
    const rows = wrapper.findAll('.skeleton-table-row')
    expect(rows).toHaveLength(3)
    
    const cells = wrapper.findAll('.skeleton-table-cell')
    expect(cells).toHaveLength(12) // 3 rows * 4 columns
  })

  it('renders chart skeleton', () => {
    const wrapper = mount(SkeletonLoader, {
      props: { variant: 'chart' }
    })
    
    expect(wrapper.find('.skeleton-chart').exists()).toBe(true)
    expect(wrapper.find('.skeleton-chart-bars').exists()).toBe(true)
  })

  it('renders image skeleton with custom dimensions', () => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        variant: 'image',
        width: '300px',
        height: '200px'
      }
    })
    
    const image = wrapper.find('.skeleton-image')
    expect(image.exists()).toBe(true)
    // Image skeleton should render with the variant class
    expect(wrapper.classes()).toContain('skeleton-image')
  })

  it('renders form skeleton with correct number of fields', () => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        variant: 'form',
        fields: 4
      }
    })
    
    const fields = wrapper.findAll('.skeleton-form-field')
    expect(fields).toHaveLength(4)
  })

  it('renders stats skeleton', () => {
    const wrapper = mount(SkeletonLoader, {
      props: { variant: 'stats' }
    })
    
    expect(wrapper.find('.skeleton-stats').exists()).toBe(true)
    expect(wrapper.findAll('.skeleton-stat-card')).toHaveLength(4)
  })

  it('applies animation class when animated is true', () => {
    const wrapper = mount(SkeletonLoader, {
      props: { animated: true }
    })
    
    expect(wrapper.find('.skeleton-animated').exists()).toBe(true)
  })

  it('does not apply animation class when animated is false', () => {
    const wrapper = mount(SkeletonLoader, {
      props: { animated: false }
    })
    
    expect(wrapper.find('.skeleton-animated').exists()).toBe(false)
  })
})
