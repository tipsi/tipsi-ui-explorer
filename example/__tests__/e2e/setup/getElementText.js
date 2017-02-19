import helper from 'tipsi-appium-helper'

helper.extend('getElementText', async (elementId) => {
  const { driver } = helper
  const { value } = await driver.elementIdText(elementId)
  return value.trim()
})
