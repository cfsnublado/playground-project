from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext as _

from .models import Foo
from .serializers import FooSerializer


@receiver(post_save, sender=Foo)
def foo_published_notification(
    sender, instance=None, created=False, **kwargs
):
    # Broadcast a notification if object is set to published.
    if instance.field_changed("publish_status"):
        if instance.publish_status == Foo.STATUS_PUBLISHED:
            channel_layer = get_channel_layer()
            foo_serializer = FooSerializer(instance)

            async_to_sync(channel_layer.group_send)(
                "notify",
                {
                    "type": "foo.published",
                    "notification": _("msg_publish_notification"),
                    "foo_data": foo_serializer.data
                }
            )
