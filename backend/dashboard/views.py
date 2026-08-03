

from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from products.models import Product, Category
from orders.models import Order, OrderItem
from users.models import CustomUser

from .serializers import DashboardSerializer


class DashboardAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        revenue = (
            Order.objects.filter(status="Delivered")
            .aggregate(total=Sum("total_amount"))["total"]
            or 0
        )

        total_orders = Order.objects.count()

        total_products = Product.objects.count()

        total_users = CustomUser.objects.count()

        total_categories = Category.objects.count()

        pending_orders = Order.objects.filter(
            status="Pending"
        ).count()

        delivered_orders = Order.objects.filter(
            status="Delivered"
        ).count()

        low_stock_products = Product.objects.filter(
            stock__lt=10
        ).count()

        monthly_data = (
            Order.objects.filter(status="Delivered")
            .annotate(month=TruncMonth("created_at"))
            .values("month")
            .annotate(revenue=Sum("total_amount"))
            .order_by("month")
        )

        monthly_revenue = [
            {
                "month": item["month"].strftime("%b"),
                "revenue": item["revenue"],
            }
            for item in monthly_data
        ]

        recent_orders = []

        for order in Order.objects.select_related("user").order_by("-created_at")[:5]:
            recent_orders.append(
                {
                    "id": order.id,
                    "customer": order.user.username,
                    "total": order.total_amount,
                    "status": order.status,
                    "created_at": order.created_at,
                }
            )

        top_products = (
            OrderItem.objects.values(
                "product__id",
                "product__name",
            )
            .annotate(total_sold=Sum("quantity"))
            .order_by("-total_sold")[:5]
        )

        top_product_list = []

        for product in top_products:
            top_product_list.append(
                {
                    "id": product["product__id"],
                    "name": product["product__name"],
                    "total_sold": product["total_sold"],
                }
            )

        serializer = DashboardSerializer(
            {
                "revenue": revenue,
                "orders": total_orders,
                "products": total_products,
                "users": total_users,
                "categories": total_categories,
                "pending_orders": pending_orders,
                "delivered_orders": delivered_orders,
                "low_stock_products": low_stock_products,
                "monthly_revenue": monthly_revenue,
                "recent_orders": recent_orders,
                "top_products": top_product_list,
            }
        )

        return Response(serializer.data)