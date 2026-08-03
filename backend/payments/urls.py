from django.urls import path

from .views import CreatePaymentOrderAPIView

from .views import (
    CreatePaymentOrderAPIView,
    VerifyPaymentAPIView,
    PaymentHistoryAPIView,
    PaymentDetailAPIView,
)

urlpatterns = [

    path(
        "create-order/",
        CreatePaymentOrderAPIView.as_view(),
        name="create-payment-order",
    ),

    path(
        "verify/",
        VerifyPaymentAPIView.as_view(),
        name="verify-payment",
    ),

    path(
        "",
        PaymentHistoryAPIView.as_view(),
        name="payment-history",
    ),

    path(
        "<int:id>/",
        PaymentDetailAPIView.as_view(),
        name="payment-detail",
    ),

]