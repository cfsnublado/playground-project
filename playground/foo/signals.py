from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework.authtoken.models import Token

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Foo
from .serializers import FooSerializer


@receiver(post_save, sender=Foo)
def foo_notification_handler(sender, instance=None, created=False, **kwargs):
    channel_layer = get_channel_layer()
    foo_serializer = FooSerializer(instance)

    async_to_sync(channel_layer.group_send)(
        "notify",
        {
            "type": "foo.updated",
            "foo_data": foo_serializer.data
        }
    )
