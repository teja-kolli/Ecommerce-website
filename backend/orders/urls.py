from django.urls import path
from .views import (
    CreateOrderView,
    OrderListView,
    OrderDetailView,
    UpdateOrderStatusView,
)

urlpatterns = [

    path(
        "",
        OrderListView.as_view()
    ),

    path(
        "create/",
        CreateOrderView.as_view()
    ),

    path(
        "<int:pk>/",
        OrderDetailView.as_view()
    ),

    path(
        "<int:pk>/status/",
        UpdateOrderStatusView.as_view()
    ),
]