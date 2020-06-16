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

  if (currentTime >= start && currentTime <= end) {
    log('Event is on!')
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
      if (checkTime(event.start_at, event.finish_at)) {
        events.push(event)
      }
    }

    log(events)
    displayEvent(events[0])
  } catch (e) {
    log('error getting event data ', e)
  }
}

/// ABOUT EVENTS API:
// root URL: https://events.decentraland.org/api/events/

// Events are always ordered by their start_at time

// optional params:
// limit: only show x amount of events
// offset: start showing events from x position onwards
// position: a single event on x position
// estate_id: only events that happen in a given estate
// user: only events created by a given user
// onlyUpcoming: only events that have not started yet
