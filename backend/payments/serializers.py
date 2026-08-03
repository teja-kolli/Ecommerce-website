from rest_framework import serializers
from rest_framework import serializers
from rest_framework import serializers
from .models import Payment
class CreateOrderSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()


class RazorpayOrderSerializer(serializers.Serializer):
    order_id = serializers.CharField()
    amount = serializers.IntegerField()
    currency = serializers.CharField()
    key = serializers.CharField()

class VerifyPaymentSerializer(serializers.Serializer):
    razorpay_order_id = serializers.CharField()
    razorpay_payment_id = serializers.CharField()
    razorpay_signature = serializers.CharField()



class PaymentListSerializer(serializers.ModelSerializer):

    order_id = serializers.IntegerField(source="order.id", read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "order_id",
            "amount",
            "currency",
            "status",
            "payment_method",
            "created_at",
        ]


class PaymentDetailSerializer(serializers.ModelSerializer):

    order_id = serializers.IntegerField(source="order.id", read_only=True)

    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "username",
            "order_id",
            "amount",
            "currency",
            "status",
            "payment_method",
            "razorpay_order_id",
            "razorpay_payment_id",
            "created_at",
            "updated_at",
        ]