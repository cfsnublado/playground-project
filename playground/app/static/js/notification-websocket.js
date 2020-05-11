const wsScheme = window.location.protocol == "https:" ? "wss" : "ws";
const wsFooUrl = wsScheme + "://" + window.location.host  + "/ws/foo"

var messages = document.getElementById("messages")
var publishNotificationWS = new ReconnectingWebSocket(wsFooUrl)


publishNotificationWS.onmessage = function(e) {
  var data = JSON.parse(e.data)
  let notification = {
    "id": createUUID(),
    "type": "alert-info",
    "message": data.notification + ": " + data.foo.name + ".",
    "timeout": true,
    "delay": 5000
  }

  QueuedNotificationStore.addNotification(notification)
}

publishNotificationWS.onopen = function(e) {
  console.log("open")
}

publishNotificationWS.onerror = function(e) {
  console.log("error")
}

publishNotificationWS.onclose = function(e) {
  console.log("close")
}
