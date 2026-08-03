
from django.db import models
from django.conf import settings
from orders.models import Order


class Payment(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Paid", "Paid"),
        ("Failed", "Failed"),
        ("Refunded", "Refunded"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="payment"
    )

    razorpay_order_id = models.CharField(
        max_length=150,
        unique=True
    )

    razorpay_payment_id = models.CharField(
        max_length=150,
        blank=True,
        null=True
    )

    razorpay_signature = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    currency = models.CharField(
        max_length=10,
        default="INR"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"Payment #{self.id} - {self.status}"
    
    PAYMENT_METHODS = [
    ("Razorpay", "Razorpay"),
    ("COD", "Cash on Delivery"),
    ]

    payment_method = models.CharField(
    max_length=20,
    choices=PAYMENT_METHODS,
    default="Razorpay"
    ) 