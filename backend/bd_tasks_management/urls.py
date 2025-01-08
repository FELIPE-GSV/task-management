from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


urlpatterns = [
    # login user
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Task
    path('task/create/', views.create_task, name="create_task"),
    path('task/list/', views.list_tasks, name="list_task"),
    path('task/delete/<int:id>/', views.delete_task, name="delete_task"),
    path('task/edit/<int:id>/', views.edit_task, name="edit_task"),

]
