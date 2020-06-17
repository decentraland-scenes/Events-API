import { getEvents, events } from './checkApi'
import utils from '../node_modules/decentraland-ecs-utils/index'
import { displayEvent } from './eventBoard'

getEvents()

let currentEvent = 0

let bannerSwitcher = new Entity()
engine.addEntity(bannerSwitcher)
bannerSwitcher.addComponent(
  new utils.Interval(4000, () => {
    displayEvent(events, currentEvent)
    currentEvent += 1
    if (currentEvent >= events.length) {
      currentEvent = 0
    }
  })
)
