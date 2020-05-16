from django.db import models

from core.managers import OrderedModelManager


class FooGroupManager(models.Manager):
    pass


class FooManager(OrderedModelManager):

    def get_queryset(self):
        return super(FooManager, self).get_queryset().select_related("foo_group")
