from django.db import models
from django.contrib.auth.models import User

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