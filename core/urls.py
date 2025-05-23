from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import DebtSearchView,LoginWithEmailView, LoginWithIINView, ExcelUploadView, PasswordResetRequestView, PasswordResetConfirmView, get_debt_info, download_building_report, get_report_history
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
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/debt/<str:iin>/', DebtSearchView.as_view(), name='debt-search'),
    path('login/email/', LoginWithEmailView.as_view(), name='login-email'),
    path('login/iin/', LoginWithIINView.as_view(), name='login-iin'),
    path('upload/', ExcelUploadView.as_view(), name='upload-excel'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('api/debt-info/', get_debt_info, name='get_debt_info'),
    path("buildings/<uuid:building_id>/report/", download_building_report, name="download_report"),
    path('buildings/reports/', get_report_history, name='report_history'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
