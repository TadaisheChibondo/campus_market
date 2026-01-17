from rest_framework import serializers
from .models import Product, ProductImage, MarketRequest, Profile

# --- 1. PROFILE SERIALIZER ---
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone_number', 'bio', 'profile_picture', 'seller_rating']

# --- 2. PRODUCT IMAGE SERIALIZER ---
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

# --- 3. PRODUCT SERIALIZER ---
class ProductSerializer(serializers.ModelSerializer):
    # READ ONLY: To show the images when fetching data
    images = ProductImageSerializer(many=True, read_only=True)
    
    # WRITE ONLY: To accept multiple images when creating
    # This explicit definition fixes the "Field name not valid" error!
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )
    
    seller_username = serializers.ReadOnlyField(source='seller.username')

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'category', 'listing_type',
            'image', 'contact_phone', 'seller_username', 'created_at',
            'images', 'uploaded_images' 
        ]

    def create(self, validated_data):
        # 1. Remove uploaded_images from the data (because the Product model doesn't have this field)
        uploaded_images = validated_data.pop('uploaded_images', [])
        
        # 2. Create the Product
        product = Product.objects.create(**validated_data)

        # 3. Create the ProductImages manually
        for image in uploaded_images:
            ProductImage.objects.create(product=product, image=image)
        
        return product

# --- 4. MARKET REQUEST SERIALIZER ---
class MarketRequestSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = MarketRequest
        fields = ['id', 'username', 'title', 'description', 'budget', 'contact_phone', 'created_at']