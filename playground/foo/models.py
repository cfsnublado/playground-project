from django.db import models
from django.utils.translation import ugettext_lazy as _

from core.models import PublishModel, TrackedFieldModel


class Foo(TrackedFieldModel, PublishModel):
    tracked_fields = ["publish_status"]

    name = models.CharField(
        verbose_name=_("label_name"),
        max_length=255,
    )
    description = models.TextField(
        verbose_name=_("label_description"),
        blank=True
    )
