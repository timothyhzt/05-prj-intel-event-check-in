# Intel Sustainability Summit: Event Check-in App

To get started, create a new Codespace from this repo.

## Attendee data

Checked-in attendees are saved in the browser's `localStorage` under the
`sustainabilitySummitAttendees` key. The attendee list and team totals are
restored automatically when the page is refreshed in the same browser.

To clear the saved attendees while testing, open the browser developer tools,
go to the Console, and run:

```js
localStorage.removeItem("sustainabilitySummitAttendees");
```
