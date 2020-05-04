from django.apps import apps
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.views.generic import UpdateView

from core.views import MessageMixin
from .models import Foo
from .forms import FooUpdateForm


APP_NAME = apps.get_app_config("foo").name


class FooUpdateView(
    LoginRequiredMixin, MessageMixin, UpdateView
):
    model = Foo
    form_class = FooUpdateForm
    template_name = "{0}/auth/foo_update.html".format(APP_NAME)

    def get_object(self, queryset=None):
        self.foo = get_object_or_404(
            Foo,
            id=self.kwargs["foo_pk"]
        )
        return self.foo

    def get_context_data(self, **kwargs):
        context = super(FooUpdateView, self).get_context_data(**kwargs)
        context["foo"] = self.foo
        return context

    def get_success_url(self):
        return reverse(
            "foo:foo_update",
            kwargs={"foo_pk": self.foo.id}
        )
