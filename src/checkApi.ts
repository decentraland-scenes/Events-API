import { displayEvent } from './eventBoard'

export let events: any[] = []

// time for the party to start
let currentTime: Date

async function getTime() {
  let url = 'http://worldtimeapi.org/api/timezone/etc/utc'

  try {
    let response = await fetch(url)
    let json = await response.json()
    currentTime = new Date(json.datetime)
    log('current time: ', currentTime)
  } catch (e) {
    log('error getting time data ', e)
  }
}

//function to call the API
async function checkTime(start: Date, end: Date) {
  if (!currentTime) {
    await getTime()
  }

  if (
    currentTime.valueOf() >= start.valueOf() &&
    currentTime.valueOf() <= end.valueOf()
  ) {
    log('Event is on! ', start.getDate())
    return true
  }
  return false
}

export async function getEvents() {
  let url = 'https://events.decentraland.org/api/events/?limit=5'

  try {
    let response = await fetch(url)
    let json = await response.json()

    log(json)

    for (let event of json.data) {
      if (
        (await checkTime(
          new Date(event.start_at),
          new Date(event.finish_at)
        )) == true
      ) {
        events.push(event)
      }
    }

    log(events)
    if (events.length > 0) {
      displayEvent(events, 0)
    }
  } catch (e) {
    log('error getting event data ', e)
  }
}
