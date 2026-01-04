import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from '@/components/ui/EmptyState.vue'

describe('EmptyState Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(EmptyState)
    
    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.find('.empty-title').text()).toBe('Tidak Ada Data')
    expect(wrapper.find('.empty-description').text()).toBe('Data yang Anda cari tidak ditemukan.')
  })

  it('renders custom title and description', () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: 'Custom Title',
        description: 'Custom description text'
      }
    })
    
    expect(wrapper.find('.empty-title').text()).toBe('Custom Title')
    expect(wrapper.find('.empty-description').text()).toBe('Custom description text')
  })

  it('renders action button when actionText is provided', () => {
    const wrapper = mount(EmptyState, {
      props: {
        actionText: 'Click Me'
      }
    })
    
    const button = wrapper.find('.btn-primary')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click Me')
  })

  it('emits action event when button is clicked', async () => {
    const wrapper = mount(EmptyState, {
      props: {
        actionText: 'Click Me'
      }
    })
    
    await wrapper.find('.btn-primary').trigger('click')
    
    expect(wrapper.emitted('action')).toBeTruthy()
  })

  it('renders tips when provided', () => {
    const tips = ['Tip 1', 'Tip 2', 'Tip 3']
    const wrapper = mount(EmptyState, {
      props: { tips }
    })
    
    const tipsList = wrapper.findAll('.empty-tips li')
    expect(tipsList).toHaveLength(3)
    expect(tipsList[0].text()).toBe('Tip 1')
  })

  it('renders different icons based on prop', () => {
    const icons = ['search', 'data', 'report', 'map', 'error', 'offline']
    
    icons.forEach(icon => {
      const wrapper = mount(EmptyState, {
        props: { icon }
      })
      expect(wrapper.find('.empty-icon svg').exists()).toBe(true)
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['small', 'medium', 'large']
    
    sizes.forEach(size => {
      const wrapper = mount(EmptyState, {
        props: { size }
      })
      expect(wrapper.find(`.empty-${size}`).exists()).toBe(true)
    })
  })

  it('renders slot content instead of default button', () => {
    const wrapper = mount(EmptyState, {
      slots: {
        default: '<button class="custom-btn">Custom Button</button>'
      }
    })
    
    expect(wrapper.find('.custom-btn').exists()).toBe(true)
    expect(wrapper.find('.custom-btn').text()).toBe('Custom Button')
  })
})
