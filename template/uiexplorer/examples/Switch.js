import React from 'react'
import { Switch } from 'react-native'
import { register } from 'tipsi-ui-explorer'

register.addExample({
  type: 'components',
  title: '<Switch />',
  description: 'Renders a boolean input.',
  examples: [{
    title: 'Value',
    description: 'Prop: value (Boolean), set to true',
    render: () => (
      <Switch value={true} onPress={() => {}} />
    ),
  }, {
    title: 'Handle switch',
    description: 'Prop: onValueChange (Function)',
    state: {
      value: false
    },
    render: ({ action, state, setState }) => ( // eslint-disable-line react/prop-types
      <Switch
        value={state.value}
        onValueChange={(value, ...args) => {
          setState({ value })
          action('onValueChange')(value)
        }}
      />
    ),
  }],
})
