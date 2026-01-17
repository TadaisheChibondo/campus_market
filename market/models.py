from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# 1. THE PRODUCT MODEL (Updated with Listing Type)
class Product(models.Model):
    # Distinguish between physical goods and services
    LISTING_TYPES = (
        ('PRODUCT', 'Product'),
        ('SERVICE', 'Service'),
    )
    
    CATEGORY_CHOICES = (
        ('GROCERIES', 'Groceries'),
        ('ELECTRONICS', 'Electronics'),
        ('CLOTHING', 'Clothing'),
        ('BOOKS', 'Books'),
        ('OTHER', 'Other'),
        # Service Categories
        ('RIDE', 'Ride / Transport'),
        ('TUTORING', 'Tutoring'),
        ('BEAUTY', 'Hair & Beauty'),
        ('TECH_SUPPORT', 'Tech Support'),
        ('LABOR', 'Manual Labor'),
    )

    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    listing_type = models.CharField(max_length=20, choices=LISTING_TYPES, default='PRODUCT')
    
    # Main cover image
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    
    contact_phone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# 2. THE EXTRA IMAGES MODEL
class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')
    
    def __str__(self):
        return f"Image for {self.product.name}"

# 3. THE REQUESTS MODEL (New)
class MarketRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    contact_phone = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# 4. THE USER PROFILE MODEL
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', default='default.jpg', blank=True)
    
    seller_rating = models.FloatField(default=0.0)
    total_reviews = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}'s Profile"

# 5. SIGNALS (To auto-create Profile)
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except Profile.DoesNotExist:
        Profile.objects.create(user=instance)