from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from django.urls import path
from django.conf.urls import include

from users.api.views_api import UserViewSet, ProfileViewSet

app_name = "app"

router = DefaultRouter()

# users
router.register("user", UserViewSet, basename="user")
router.register("profile", ProfileViewSet, basename="profile")

urlpatterns = [
    path("api-token-auth/", views.obtain_auth_token, name="auth_token"),
    path("", include(router.urls)),
]
