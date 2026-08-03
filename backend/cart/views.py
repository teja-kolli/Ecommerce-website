from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product

from .models import Cart, CartItem
from .serializers import CartSerializer


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return Response(CartSerializer(cart).data)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)

        product_id = request.data.get("product")
        if not product_id:
            return Response(
                {"error": "Product ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
        )

        if not created:
            item.quantity += int(request.data.get("quantity", 1))
            item.save()

        return Response(CartSerializer(cart).data)


class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "Item not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        quantity = request.data.get("quantity")
        if quantity is not None:
            quantity = int(quantity)
            if quantity < 1:
                item.delete()
                cart = Cart.objects.get(user=request.user)
                return Response(CartSerializer(cart).data)
            item.quantity = quantity
            item.save()

        return Response(CartSerializer(item.cart).data)

    def delete(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "Item not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart = item.cart
        item.delete()
        return Response(CartSerializer(cart).data)
