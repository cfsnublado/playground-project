from rest_framework import serializers

from core.serializers import BaseSerializer
from .models import Foo


class FooSerializer(BaseSerializer, serializers.ModelSerializer):

    class Meta:
        model = Foo
        fields = (
            "name", "description"
        )
