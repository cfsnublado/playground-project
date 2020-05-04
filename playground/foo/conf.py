from appconf import AppConf

from django.conf import settings


class FooConf(AppConf):
    URL_PREFIX = "foo"
