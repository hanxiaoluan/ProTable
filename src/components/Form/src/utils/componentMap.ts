import { NInput, NSelect, NDatePicker } from 'naive-ui'
import type { Component } from 'vue'

export type ComponentType = 'Input'|'Select'|'DatePicker'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', NInput)
componentMap.set('Select', NSelect)
componentMap.set('DatePicker', NDatePicker)

export { componentMap }
