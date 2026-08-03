from decimal import Decimal

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from orders.models import Order
from .models import Payment
from rest_framework import generics
from .serializers import (
    CreateOrderSerializer,
    RazorpayOrderSerializer,
)
from .serializers import (
    PaymentListSerializer,
    PaymentDetailSerializer,
)

from .services import create_razorpay_order
from django.db import transaction
from .serializers import VerifyPaymentSerializer
from .services import verify_payment_signature


class CreatePaymentOrderAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CreateOrderSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        order_id = serializer.validated_data["order_id"]

        try:
            order = Order.objects.get(
                id=order_id,
                user=request.user,
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "error": "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # Prevent duplicate payments

        if hasattr(order, "payment"):

            return Response(
                {
                    "error":
                    "Payment already exists."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        amount_in_paise = int(
            Decimal(order.total_amount) * 100
        )

        razorpay_order = create_razorpay_order(
            amount_in_paise
        )

        Payment.objects.create(

            user=request.user,

            order=order,

            razorpay_order_id=razorpay_order["id"],

            amount=order.total_amount,

            currency="INR",

            status="Pending",

        )

        response = RazorpayOrderSerializer(
            {
                "order_id": razorpay_order["id"],
                "amount": amount_in_paise,
                "currency": "INR",
                "key": settings.RAZORPAY_KEY_ID
            }
        )

        return Response(response.data)
class VerifyPaymentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):

        serializer = VerifyPaymentSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        is_valid = verify_payment_signature(
            {
                "razorpay_order_id": data["razorpay_order_id"],
                "razorpay_payment_id": data["razorpay_payment_id"],
                "razorpay_signature": data["razorpay_signature"],
            }
        )

        if not is_valid:

            return Response(
                {
                    "success": False,
                    "message": "Invalid payment signature."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            payment = Payment.objects.select_for_update().get(
                razorpay_order_id=data["razorpay_order_id"]
            )

        except Payment.DoesNotExist:

            return Response(
                {
                    "success": False,
                    "message": "Payment not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if payment.status == "Paid":

            return Response(
                {
                    "success": True,
                    "message": "Payment already verified."
                }
            )

        payment.razorpay_payment_id = data["razorpay_payment_id"]

        payment.razorpay_signature = data["razorpay_signature"]

        payment.status = "Paid"

        payment.save()

        order = payment.order

        order.status = "Confirmed"

        order.save()

        return Response(
            {
                "success": True,
                "message": "Payment verified successfully.",
                "payment_id": payment.razorpay_payment_id,
                "order_id": order.id,
            }
        )


class PaymentHistoryAPIView(generics.ListAPIView):

    serializer_class = PaymentListSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Payment.objects.filter(user=self.request.user)
            .select_related("order")
            .order_by("-created_at")
        )
class PaymentDetailAPIView(generics.RetrieveAPIView):

    serializer_class = PaymentDetailSerializer

    permission_classes = [IsAuthenticated]

    lookup_field = "id"

    def get_queryset(self):
        return (
            Payment.objects.filter(user=self.request.user)
            .select_related("order", "user")
        )