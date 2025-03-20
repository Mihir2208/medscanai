from django.urls import path
from .views import ScanImageView

urlpatterns = [
    path('upload/', ScanImageView.as_view(), name='upload-scan'),
]