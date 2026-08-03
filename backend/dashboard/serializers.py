from rest_framework import serializers


class MonthlyRevenueSerializer(serializers.Serializer):
    month = serializers.CharField()
    revenue = serializers.DecimalField(max_digits=12, decimal_places=2)


class RecentOrderSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    customer = serializers.CharField()
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    status = serializers.CharField()
    created_at = serializers.DateTimeField()


class TopProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    total_sold = serializers.IntegerField()


class DashboardSerializer(serializers.Serializer):
    revenue = serializers.DecimalField(max_digits=12, decimal_places=2)

    orders = serializers.IntegerField()

    products = serializers.IntegerField()

    users = serializers.IntegerField()

    categories = serializers.IntegerField()

    pending_orders = serializers.IntegerField()

    delivered_orders = serializers.IntegerField()

    low_stock_products = serializers.IntegerField()

    monthly_revenue = MonthlyRevenueSerializer(many=True)

    recent_orders = RecentOrderSerializer(many=True)

    top_products = TopProductSerializer(many=True)