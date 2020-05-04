const wsScheme = window.location.protocol == "https:" ? "wss" : "ws";
const wsFooUrl = wsScheme + "://" + window.location.host  + "/ws/foo"

var messages = document.getElementById("messages")
var notificationSocket = new ReconnectingWebSocket(wsFooUrl)

notificationSocket.onmessage = function(e) {
  console.log(e.data)
  var alertMsg = `
    <div class="alert abs-alert alert-info">

    <div class="alert-content">
    The earth is going to explode today!
    </div>

    <a href=""
    type="button" 
    class="close"
    >
    <span aria-hidden="true">&times;</span>
    </a>

    </div>
  `
  document.getElementById("messages").innerHTML = alertMsg
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
