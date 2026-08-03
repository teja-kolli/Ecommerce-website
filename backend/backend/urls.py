from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/", include("products.urls")),
    path("api/", include("users.urls")),
    path("api/cart/", include("cart.urls")),
    path("api/orders/", include("orders.urls")),
    path("api/wishlist/", include("wishlist.urls")),
    path("api/payments/", include("payments.urls")),
    path("api/dashboard/", include("dashboard.urls")),
    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]