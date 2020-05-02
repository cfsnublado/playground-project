import asyncio
import json

from channels.consumer import AsyncConsumer


class EchoConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        print('connected', event)
        await self.send({
            'type': 'websocket.accept'
        })

    async def websocket_receive(self, event):
        print('receive', event)
        text = event.get('text', None)
        if text:
            loaded_text = json.loads(text)
            msg = loaded_text.get('message', 'No message')
            await self.send({
                "type": "websocket.send",
                "text": msg,
            })

    async def websocket_disconnect(self, event):
        print('disconnected', event)
