const wsScheme = window.location.protocol == "https:" ? "wss" : "ws";
const wsFooUrl = wsScheme + "://" + window.location.host  + "/ws/foo"

var messages = document.getElementById("messages")
var notificationSocket = new ReconnectingWebSocket(wsFooUrl)


notificationSocket.onmessage = function(e) {
  var data = JSON.parse(e.data)
  let notification = {
    "id": createUUID(),
    "type": "alert-info",
    "message": "A new post has been created: " + data.foo.name + ".",
    "timeout": true,
    "delay": 5000
  }

  QueuedNotificationStore.addNotification(notification)
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
