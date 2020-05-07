const NotificationStore = {
  /**
  This is used throughout the app to directly store notifications.
  Later on, make a plugin or something. This 
  seems a bit hack.
  **/

  notifications: [],

  addNotification: function (notification, insertAtEnd=true) {
    if (insertAtEnd) {
      this.notifications.push(notification)
    } else {
      this.notifications.unshift(notification)
    }
  },
}

const QueuedNotificationStore = {

  notifications: [],
  queue: new Queue(),

  addNotification: function (notification) {

    if (this.notifications.length > 0) {
      this.queue.enqueue(notification)
    } else {
      if (!this.queue.isEmpty()) {
        let queuedNotification = this.queue.dequeue()
        this.notifications.unshift(queuedNotification)
      } else {
        this.notifications.unshift(notification)
      }
    }
  },
}

const Notification = {
  /** 
  notification
    type: string,
    message: string,
    timeout: boolean,
    delay: integer
  **/
  props: {
    notification: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      timer: null,
      timeout: this.notification.hasOwnProperty("timeout") ? this.notification.timeout : true,
      delay: this.notification.hasOwnProperty("delay") ? this.notification.delay : 3000,
      type: this.notification.hasOwnProperty("type") ? this.notification.type : "alert-info",
      message: this.notification.hasOwnProperty("message") ? this.notification.message : ""
    }
  },
  methods: {
    close() {
      this.$emit("remove-notification")

      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    load() {
      if (this.timeout) {
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.close()
        }, this.delay) 
      }
    }
  },
  mounted() {
    this.load()
  },
  template: `
    <transition name="bounce">

    <div :class="[type, 'alert']">

    <div class="alert-content">
    {{ message }}
    </div>

    <a href=""
    type="button" 
    class="close"
    @click.prevent="close"
    >
    <span aria-hidden="true">&times;</span>
    </a>

    </div>

    </transition>
  `
}

const Notifications = {
  components: {
    "notification": Notification
  },
  data () {
    return {
      notifications: NotificationStore.notifications
    }
  },
  methods: {
    removeNotification(index) {
      this.$delete(this.notifications, index)
      console.log("notifications length: " + this.notifications.length)
    }
  },
  template: `
    <div>

    <notification
    v-for="(notification, index) in notifications"
    :notification="notification"
    :key="notification.id"
    @remove-notification="removeNotification(index)"
    >
    </notification>

    </div>
  `
}

const QueuedNotifications = {
  components: {
    "notification": Notification
  },
  data () {
    return {
      notifications: QueuedNotificationStore.notifications,
      queue: QueuedNotificationStore.queue
    }
  },
  methods: {
    removeNotification(index) {
      this.$delete(this.notifications, index)
      if (this.notifications.length == 0 && !this.queue.isEmpty()) {
        let notification = this.queue.dequeue()
        this.notifications.push(notification)
      }
      console.log("notifications length: " + this.notifications.length)
      console.log("queue length: " + this.queue.length())
    }
  },
  template: `
    <div>

    <notification
    v-for="(notification, index) in notifications"
    :notification="notification"
    :key="notification.id"
    @remove-notification="removeNotification(index)"
    >
    </notification>

    </div>
  `
}