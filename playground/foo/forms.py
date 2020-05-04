from core.forms import BaseModelForm
from .models import Foo


class FooForm(BaseModelForm):

    class Meta:
        abstract = True
        fields = ["name", "description"]


class FooCreateForm(FooForm):

    class Meta(FooForm.Meta):
        model = Foo


class FooUpdateForm(FooForm):

    class Meta(FooForm.Meta):
        model = Foo
