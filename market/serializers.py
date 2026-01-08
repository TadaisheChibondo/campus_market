from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    seller_username = serializers.ReadOnlyField(source='seller.username')

    # Add this line to make the seller ID read-only too
    seller = serializers.ReadOnlyField(source='seller.id')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'category', 'created_at', 'seller', 'seller_username', 'contact_phone']