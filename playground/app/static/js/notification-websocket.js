const wsScheme = window.location.protocol == "https:" ? "wss" : "ws";
const wsFooUrl = wsScheme + "://" + window.location.host  + "/ws/foo"

var messages = document.getElementById("messages")
var notificationSocket = new ReconnectingWebSocket(wsFooUrl)

function createUUID() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
}

notificationSocket.onmessage = function(e) {
  console.log(e.data)

  let notification = {
    "id": createUUID(),
    "type": "alert-success",
    "message": "Holy shit! It may have worked!",
    "timeout": true,
    "delay": 5000
  }

  NotificationStore.addNotification(notification)
}

notificationSocket.onopen = function(e) {
  console.log("open")
}

notificationSocket.onerror = function(e) {
  console.log("error")
}

notificationSocket.onclose = function(e) {
  console.log("close")
}
