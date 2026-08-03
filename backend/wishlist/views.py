from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Wishlist, WishlistItem
from .serializers import WishlistSerializer
from products.models import Product


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist, created = Wishlist.objects.get_or_create(
            user=request.user
        )

        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)


class AddToWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product")

        if not product_id:
            return Response(
                {"error": "Product ID is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        wishlist, created = Wishlist.objects.get_or_create(
            user=request.user
        )

        item, created = WishlistItem.objects.get_or_create(
            wishlist=wishlist,
            product=product
        )

        if not created:
            return Response(
                {"message": "Product already in wishlist."},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"message": "Product added to wishlist."},
            status=status.HTTP_201_CREATED,
        )


class RemoveFromWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        wishlist, created = Wishlist.objects.get_or_create(
            user=request.user
        )

        try:
            item = WishlistItem.objects.get(
                wishlist=wishlist,
                product_id=product_id
            )
            item.delete()

            return Response(
                {"message": "Product removed from wishlist."},
                status=status.HTTP_200_OK,
            )

        except WishlistItem.DoesNotExist:
            return Response(
                {"error": "Product not found in wishlist."},
                status=status.HTTP_404_NOT_FOUND,
            )