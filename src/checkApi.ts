import { displayEvent } from './eventBoard'

export async function getEvents() {
  const events: any[] = []
  const url = 'https://events.decentraland.org/api/events/?limit=5'

  try {
    const response = await fetch(url)
    const json = await response.json()

    log(json)

    for (const event of json.data) {
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
