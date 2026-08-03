import razorpay
from django.conf import settings
import razorpay
from django.conf import settings


client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET,
    )
)


def create_razorpay_order(amount):
    """
    amount should be in paise.
    Example:
        ₹500 => 50000
    """

    data = {
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1,
    }

    return client.order.create(data=data)

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET,
    )
)


def verify_payment_signature(data):
    """
    Returns True if the Razorpay signature is valid.
    """
    try:
        client.utility.verify_payment_signature(data)
        return True
    except razorpay.errors.SignatureVerificationError:
        return False