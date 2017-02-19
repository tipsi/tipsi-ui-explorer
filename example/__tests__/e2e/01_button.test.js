import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const { driver, select, getElementText, idFromXPath } = helper

test('Button', async (t) => {
  const battonsId = select({
    ios: idFromXPath(`//
      XCUIElementTypeScrollView[1]/*/*/XCUIElementTypeOther[2]/XCUIElementTypeButton[1]
    `),
    android: idFromXPath(`//
      android.widget.ScrollView[1]/*/*/android.widget.Button[1]/android.widget.TextView[1]
    `),
  })
  const eventsId = select({
    ios: idFromXPath(`//
      XCUIElementTypeScrollView[1]/XCUIElementTypeOther/XCUIElementTypeOther[2]/
      XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeStaticText[1]
    `),
    android: idFromXPath(`//
      android.widget.ScrollView[1]/android.view.View[1]/android.view.View[2]/
      android.view.View[2]/android.widget.TextView
    `)
  })
  const firstButtonLabel = 'example'
  const secondButtonLabel = 'press me!'
  const eventLabel = 'event: onPress, args:'

  try {
    await helper.openExampleFor('<Button />', 60000)

    const { value: visibleButtons } = await driver
      .waitForVisible(battonsId, 30000)
      .elements(battonsId)

    t.same(visibleButtons.length, 2, 'Should render two buttons')
    t.same(
      (await getElementText(visibleButtons[0].ELEMENT)).toLowerCase(),
      firstButtonLabel,
      `First button label should be ${firstButtonLabel}`
    )
    t.same(
      (await getElementText(visibleButtons[1].ELEMENT)).toLowerCase(),
      secondButtonLabel,
      `Second button label should be ${secondButtonLabel}`
    )

    await driver.elementIdClick(visibleButtons[1].ELEMENT)
    await driver.elementIdClick(visibleButtons[1].ELEMENT)
    await driver.elementIdClick(visibleButtons[1].ELEMENT)

    const { value: visibleEvents } = await driver
      .waitForVisible(eventsId, 30000)
      .elements(eventsId)

    t.same(visibleEvents.length, 3, 'Should render three events')

    for (let event of visibleEvents) {
      t.same(
        (await getElementText(event.ELEMENT)),
        eventLabel,
        `Event label should be equal to ${eventLabel}`
      )
    }
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
