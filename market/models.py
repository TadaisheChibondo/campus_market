from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings # To refer to the User model correctly

class Product(models.Model):
    # Categories helps buyers filter products later
    CATEGORY_CHOICES = [
        ('GROCERIES', 'Groceries'),
        ('ELECTRONICS', 'Electronics'),
        ('CLOTHING', 'Clothing'),
        ('BOOKS', 'Books'),
        ('OTHER', 'Other'),
    ]

    # Link the product to the student who is selling it
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2) # e.g., 99999.99
    contact_phone = models.CharField(max_length=20, default='')
    
    # This requires the 'Pillow' library we installed earlier
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
# In your models.py

class ProductImage(models.Model):
    # This links the image to a specific product
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')
    
    def __str__(self):
        return f"Image for {self.product.name}"
    

# Add these imports at the top


# ... existing Product and ProductImage models ...

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', default='default.jpg', blank=True)
    
    # These fields are for the future (Reviews/Ratings)
    seller_rating = models.FloatField(default=0.0)
    total_reviews = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}'s Profile"

# --- SIGNALS ---
# These functions run automatically! 
# When a User is created -> Create a Profile
# When a User is saved -> Save the Profile

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    # This ensures existing users get a profile if they don't have one (Backward Compatibility)
    try:
        instance.profile.save()
    except Profile.DoesNotExist:
        Profile.objects.create(user=instance)