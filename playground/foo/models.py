from django.db import models
from django.utils.translation import ugettext_lazy as _

from .managers import FooManager, FooGroupManager
from core.models import OrderedModel, PublishModel, TrackedFieldModel


class FooGroup(models.Model):
    name = models.CharField(
        verbose_name=_("label_name"),
        max_length=255,
    )
    description = models.TextField(
        verbose_name=_("label_description"),
        blank=True
    )

    objects = FooGroupManager()


class Foo(
    TrackedFieldModel, PublishModel,
    OrderedModel
):
    tracked_fields = ["publish_status"]
    group_field = "foo_group_id"

    foo_group = models.ForeignKey(
        FooGroup,
        related_name="foos",
        on_delete=models.CASCADE
    )
    name = models.CharField(
        verbose_name=_("label_name"),
        max_length=255,
    )
    description = models.TextField(
        verbose_name=_("label_description"),
        blank=True
    )

    objects = FooManager()

    class Meta:
        index_together = ("foo_group", "order")
