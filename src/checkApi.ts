import { displayEvent } from './eventBoard'

export async function getEvents() {
  let events: any[] = []
  let url = 'https://events.decentraland.org/api/events/?limit=5'

  try {
    let response = await fetch(url)
    let json = await response.json()

    log(json)

    for (let event of json.data) {
      if (event.live) {
        events.push(event)
      }
    }

    log(events)
    return events
  } catch (e) {
    log('error getting event data ', e)
  }
}
