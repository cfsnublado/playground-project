from channels.layers import get_channel_layer
from channels.routing import get_default_application
from channels.testing import WebsocketCommunicator
import pytest

from django.conf import settings

from foo.consumers import FooConsumer

application = get_default_application()


@pytest.mark.asyncio
class TestWebSocket:
    async def test_can_connect_to_server(self, settings):
        communicator = WebsocketCommunicator(
            FooConsumer,
            path="ws/foo"
        )
        connected, _ = await communicator.connect()
        assert connected is True

        await communicator.disconnect()

    async def test_channel_layer_groups(self, settings):
        communicator = WebsocketCommunicator(
            FooConsumer,
            path="ws/foo"
        )
        connected, _ = await communicator.connect()
        assert connected is True

        channel_layer = get_channel_layer()
        message = {"type": "foo.updated", "foo_data": {"msg": "hello"}}

        await channel_layer.group_send("notify", message)
        await communicator.disconnect()
