from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class FooConfig(AppConfig):
    name = "foo"
    verbose_name = _("label_foo_config")
