from rest_framework import serializers
from .models import Product, ProductImage, Profile, MarketRequest

# 1. Mini serializer for the extra images
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

# 2. Main Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    seller_username = serializers.ReadOnlyField(source='seller.username')
    seller = serializers.ReadOnlyField(source='seller.id')

    # Reads the extra images when you GET a product
    images = ProductImageSerializer(many=True, read_only=True)

    # Catches the extra images when you POST a product
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Product
        fields = [
            'id', 
            'name', 
            'description', 
            'price', 
            'category', 
            'image',            # Main cover image
            'contact_phone', 
            'created_at', 
            'seller', 
            'seller_username',
            'images',           # List of extra images (Read Only)
            'uploaded_images'   # Input for extra images (Write Only)
        ]

    def create(self, validated_data):
        # 1. Pop the list of images out of the data (default to empty list if none)
        uploaded_images = validated_data.pop('uploaded_images', [])
        
        # 2. Create the Product normally
        product = Product.objects.create(**validated_data)
        
        # 3. Loop through the extra images and save them linked to this product
        for img in uploaded_images:
            ProductImage.objects.create(product=product, image=img)
            
        return product
    



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone_number', 'bio', 'profile_picture', 'seller_rating']

# We can create a serializer that combines User + Profile for the "Me" endpoint
class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        from django.contrib.auth.models import User
        model = User
        fields = ['id', 'username', 'email', 'profile']

# In serializers.py

# 1. New Serializer for Requests
class MarketRequestSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = MarketRequest
        fields = ['id', 'username', 'title', 'description', 'budget', 'contact_phone', 'created_at']

# 2. Update ProductSerializer
class ProductSerializer(serializers.ModelSerializer):
    # ... existing fields ...
    
    class Meta:
        model = Product
        # Add 'listing_type' to the fields list!
        fields = ['id', 'name', 'description', 'price', 'category', 'listing_type', 'image', 'contact_phone', 'images', 'uploaded_images', 'seller', 'seller_username', 'created_at']