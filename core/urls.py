from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import DebtSearchView,LoginWithEmailView, LoginWithIINView, ExcelUploadView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'debtors', views.DebtorViewSet)
router.register(r'buildings', views.BuildingViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'exceluploads', views.ExcelUploadViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/debt/<str:iin>/', DebtSearchView.as_view(), name='debt-search'),
    path('login/email/', LoginWithEmailView.as_view(), name='login-email'),
    path('login/iin/', LoginWithIINView.as_view(), name='login-iin'),
    path('upload/', ExcelUploadView.as_view(), name='upload-excel'),
]
