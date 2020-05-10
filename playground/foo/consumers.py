from channels.generic.websocket import AsyncJsonWebsocketConsumer


"""
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


channel_layer = get_channel_layer()

async_to_sync(channel_layer.group_send(
    "notify",
    {
        "type": "foo.updated",
        "foo_data": foo_data
    }
)
"""


class FooConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.channel_layer.group_add(
            "notify",
            self.channel_name
        )
        await self.accept()

    async def foo_updated(self, event):
        await self.send_json(
            {
                "msg_type": "foo_updated",
                "foo": event["foo_data"]
            }
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "notify",
            self.channel_name
        )
