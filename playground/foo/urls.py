from django.urls import include, path

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
    path("auth/", include(auth_urls)),
]
