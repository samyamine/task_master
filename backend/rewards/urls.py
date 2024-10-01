from django.urls import path
from .views import RewardView, total_xp_view, complete_reward

urlpatterns = [
    path('', RewardView.as_view({'get': 'list'}), name='reward-list'),
    path('<int:id>/', RewardView.as_view({'get': 'retrieve', 'patch': 'partial_update'}), name='reward-detail'),
    path('total_xp/', total_xp_view, name='total-xp'),
    path('<int:id>/complete/', complete_reward, name='complete-reward'),
]

