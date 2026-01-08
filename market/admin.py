from django.contrib import admin
from .models import Product

# This tells the Admin panel: "Please let me manage Products here!"
admin.site.register(Product)
# Register your models here.
