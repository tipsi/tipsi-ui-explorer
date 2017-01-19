import React from 'react'
import { Button } from 'react-native'
import { register } from 'tipsi-ui-explorer'

register.addExample({
  type: 'components',
  title: '<Button />',
  description: 'Button component',
  examples: [{
    title: 'Title',
    description: 'Prop: title (String)',
    render: () => (
      <Button title="Example" onPress={() => {}} />
    ),
  }, {
    title: 'Handle press',
    description: 'Prop: onPress (Function)',
    render: ({ action }) => ( // eslint-disable-line react/prop-types
      <Button title="Press me!" onPress={action('onPress')} />
    ),
  }],
})
