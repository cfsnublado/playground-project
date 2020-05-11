from channels.generic.websocket import AsyncJsonWebsocketConsumer


class FooConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.channel_layer.group_add(
            "notify",
            self.channel_name
        )
        await self.accept()

    async def foo_published(self, event):
        await self.send_json(
            {
                "msg_type": "foo_published",
                "foo": event["foo_data"]
            }
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "notify",
            self.channel_name
        )
