from django.urls import path, include
from rest_framework.routers import DefaultRouter # <--- Import Router
from .views import ProductListCreate, ProductDetail, MarketRequestViewSet

# Create a router and register our ViewSet
router = DefaultRouter()
router.register(r'requests', MarketRequestViewSet)

urlpatterns = [
    # 1. Manual paths for Products (Keep these)
    path('products/', ProductListCreate.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    
    # 2. Automatic paths for Requests (Add this)
    path('', include(router.urls)),
]