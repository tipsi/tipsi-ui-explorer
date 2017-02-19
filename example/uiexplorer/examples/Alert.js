import React from 'react'
import { Alert, Button } from 'react-native'
import { register } from 'tipsi-ui-explorer'

register.addExample({
  type: 'api',
  title: 'Alert',
  description: 'Launches an alert dialog with the specified title and message.',
  examples: [{
    title: 'Simple Alert',
    description: 'Method: alert(title, message?, buttons?, options?, type?)',
    render: () => (
      <Button
        title='Show alert'
        onPress={() => Alert.alert(
          'Alert Title',
          'Alert Message'
        )}
      />
    ),
  }, {
    title: 'Custom Buttons',
    description: 'Prop: onValueChange (Function)',
    state: {
      value: false
    },
    render: ({ action, state, setState }) => ( // eslint-disable-line react/prop-types
      <Button
        title='Show alert with buttons'
        onPress={() => Alert.alert(
          'Info',
          'Click on any button',
          [{
            text: 'Cancel',
            onPress: action('onPress: Cancel')
          }, {
            text: 'OK',
            onPress: action('onPress: OK')
          }]
        )}
      />
    ),
  }],
})
