# events-api

Call the Decentraland Events API to display events that are currently going on

## About the events API:

root URL: https://events.decentraland.org/api/events/

Events are always ordered by their start_at time

optional params:

- limit: only show x amount of events
- offset: start showing events from x position onwards
- position: a single event on x position
- estate_id: only events that happen in a given estate
- user: only events created by a given user
- onlyUpcoming: only events that have not started yet
