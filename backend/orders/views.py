from decimal import Decimal

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer
from rest_framework.permissions import IsAdminUser
class CreateOrderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        cart_items = cart.items.all()

        if not cart_items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(
            user=request.user
        )

        total = Decimal("0.00")

        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

            total += item.product.price * item.quantity

        order.total_amount = total
        order.save()

        cart_items.delete()

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED
        )
class OrderListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        orders = Order.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)
class OrderDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            order = Order.objects.get(
                id=pk,
                user=request.user
            )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = OrderSerializer(order)

        return Response(serializer.data)


class UpdateOrderStatusView(APIView):

    permission_classes = [IsAdminUser]

    def patch(self, request, pk):

        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        status_value = request.data.get("status")

        order.status = status_value
        order.save()

        return Response(
            {"message": "Status updated"}
        )