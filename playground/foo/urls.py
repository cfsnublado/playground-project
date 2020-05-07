from django.urls import include, path
from django.views.generic import TemplateView

from .views import FooUpdateView


app_name = "foo"

auth_urls = [
    path(
        "foo/<int:foo_pk>/update/",
        FooUpdateView.as_view(),
        name="foo_update"
    ),
]

urlpatterns = [
    path(
        "notifications",
        TemplateView.as_view(template_name="foo/notifications.html"),
        name="notifications"
    ),
    path("auth/", include(auth_urls)),
]
