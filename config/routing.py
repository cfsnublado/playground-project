from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from django.urls import path

from foo.consumers import FooConsumer

application = ProtocolTypeRouter({
    "websocket": AllowedHostsOriginValidator(
        URLRouter(
            [
                path(
                    "ws/foo",
                    FooConsumer,
                    name="ws_foo"
                ),
            ]
        )
    )
})
