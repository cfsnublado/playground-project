from django.db import models
from django.utils.translation import ugettext_lazy as _

from core.models import PublishModel


class Foo(PublishModel):
    name = models.CharField(
        verbose_name=_("label_name"),
        max_length=255,
    )
    description = models.TextField(
        verbose_name=_("label_description"),
        blank=True
    )
