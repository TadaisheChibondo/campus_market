from django.shortcuts import render
from rest_framework import generics, viewsets, permissions  # <--- Added viewsets, permissions
from .models import Product, MarketRequest
from .serializers import ProductSerializer, MarketRequestSerializer
from django.db.models import Q 

# --- PRODUCT VIEWS (Using Generics) ---
class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        return queryset

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# --- MARKET REQUEST VIEWS (Using ViewSets) ---
class MarketRequestViewSet(viewsets.ModelViewSet):
    # This handles GET, POST, PUT, DELETE for requests automatically
    queryset = MarketRequest.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = MarketRequestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)