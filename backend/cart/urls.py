from django.urls import path

from .views import AddToCartView, CartItemView, CartView

urlpatterns = [
    path("", CartView.as_view()),
    path("add/", AddToCartView.as_view()),
    path("items/<int:pk>/", CartItemView.as_view()),
]