import { displayEvent, createEventsBoard } from './eventBoard'

createEventsBoard({
  position: new Vector3(8, 3.5, 8),
  rotation: Quaternion.Euler(0, 225, 0),
}).catch((error) => log(error))
