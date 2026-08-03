from django.core.management.base import BaseCommand

from products.models import Category, Product

SAMPLE_CATEGORIES = [
    ("Electronics", "Laptops, headphones, and gadgets"),
    ("Fashion", "Clothing and accessories"),
    ("Mobiles", "Smartphones and tablets"),
    ("Home", "Furniture and home essentials"),
    ("Gaming", "Consoles, games, and gear"),
    ("Accessories", "Watches, bags, and more"),
]

SAMPLE_PRODUCTS = [
    {
        "category": "Electronics",
        "name": "Wireless Noise-Cancelling Headphones",
        "description": "Premium over-ear headphones with 30-hour battery life and active noise cancellation.",
        "price": 4999,
        "stock": 50,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    },
    {
        "category": "Electronics",
        "name": "Ultra HD Smart TV 55 inch",
        "description": "4K HDR smart TV with built-in streaming apps and voice control.",
        "price": 42999,
        "stock": 20,
        "image": "https://images.unsplash.com/photo-1593359673509-e575f12f1d1a?w=600",
    },
    {
        "category": "Fashion",
        "name": "Classic Denim Jacket",
        "description": "Timeless denim jacket with a modern slim fit. Perfect for all seasons.",
        "price": 2499,
        "stock": 80,
        "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93b0?w=600",
    },
    {
        "category": "Fashion",
        "name": "Running Sneakers Pro",
        "description": "Lightweight running shoes with responsive cushioning and breathable mesh.",
        "price": 3499,
        "stock": 100,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },
    {
        "category": "Mobiles",
        "name": "Smartphone X Pro",
        "description": "Flagship smartphone with 128GB storage, triple camera, and 5000mAh battery.",
        "price": 54999,
        "stock": 35,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    },
    {
        "category": "Mobiles",
        "name": "Budget Smartphone Lite",
        "description": "Affordable smartphone with great performance for everyday use.",
        "price": 12999,
        "stock": 60,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600",
    },
    {
        "category": "Home",
        "name": "Ergonomic Office Chair",
        "description": "Adjustable lumbar support chair designed for long work sessions.",
        "price": 8999,
        "stock": 25,
        "image": "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
    },
    {
        "category": "Home",
        "name": "Smart LED Desk Lamp",
        "description": "Adjustable brightness and color temperature with USB charging port.",
        "price": 1999,
        "stock": 45,
        "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    },
    {
        "category": "Gaming",
        "name": "Mechanical Gaming Keyboard",
        "description": "RGB backlit keyboard with tactile switches for competitive gaming.",
        "price": 5999,
        "stock": 40,
        "image": "https://images.unsplash.com/photo-1511467687857-7d0ad0990a4c?w=600",
    },
    {
        "category": "Gaming",
        "name": "Wireless Gaming Mouse",
        "description": "High-precision sensor with customizable buttons and RGB lighting.",
        "price": 2999,
        "stock": 55,
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
    },
    {
        "category": "Accessories",
        "name": "Leather Crossbody Bag",
        "description": "Handcrafted genuine leather bag with multiple compartments.",
        "price": 3999,
        "stock": 30,
        "image": "https://images.unsplash.com/photo-1548036328-c9fa89d12836?w=600",
    },
    {
        "category": "Accessories",
        "name": "Smart Watch Series 5",
        "description": "Fitness tracking, heart rate monitor, and notification support.",
        "price": 7999,
        "stock": 40,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    },
]


class Command(BaseCommand):
    help = "Seed the database with sample categories and products"

    def handle(self, *args, **options):
        categories = {}

        for name, description in SAMPLE_CATEGORIES:
            category, created = Category.objects.get_or_create(
                name=name,
                defaults={"description": description},
            )
            categories[name] = category
            if created:
                self.stdout.write(f"Created category: {name}")

        created_count = 0
        for item in SAMPLE_PRODUCTS:
            _, created = Product.objects.get_or_create(
                name=item["name"],
                defaults={
                    "category": categories[item["category"]],
                    "description": item["description"],
                    "price": item["price"],
                    "stock": item["stock"],
                    "image": item["image"],
                },
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seed complete. {created_count} new products added."
            )
        )
