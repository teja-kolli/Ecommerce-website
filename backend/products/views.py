from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
   

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # Exact filters
    filterset_fields = [
        "category",
    ]

    # Search
    search_fields = [
        "name",
        "description",
    ]

    # Sorting
    ordering_fields = [
        "price",
        "created_at",
        "stock",
    ]