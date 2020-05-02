from appconf import AppConf

from django.conf import settings


class ChatConf(AppConf):
    URL_PREFIX = 'chat'
