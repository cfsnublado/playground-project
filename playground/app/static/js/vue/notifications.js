const NotificationStore = {
  /**
  This is used throughout the app to directly store notifications.
  It is used in Notifications. Later on, make a plugin or something. This 
  seems a bit hack.
  **/

  state: [],

  addNotification: function (notification) {
    this.state.push(notification)
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
    <transition name="fade-transition-slow">

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
      notifications: NotificationStore.state
    }
  },
  methods: {
    removeNotification: function (index) {
      this.$delete(this.notifications, index)
      console.log("notification queue length: " + this.notifications.length)
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