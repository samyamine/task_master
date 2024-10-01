from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Reward
from .serializers import RewardSerializer
from django.db.models import Sum


class RewardView(viewsets.ModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer

    # def perform_update(self, serializer):
    #     instance = serializer.save()
    #     # On ne devrait pas changer `completed` à `True` si ce n'est pas fait ici
    #     # On peut le faire dans une méthode séparée


@api_view(['GET'])
def total_xp_view(request):
    completed_rewards = Reward.objects.filter(completed=True)
    total_xp_data = completed_rewards.aggregate(total_xp=Sum('xp_reward'))
    if total_xp_data['total_xp'] is None:
        total_xp = 0
    else:
        total_xp = total_xp_data

    return Response({"total_xp": total_xp})


@api_view(['PATCH'])
def complete_reward(request, id):
    try:
        reward = Reward.objects.get(pk=id)
        reward.completed = True
        reward.save()
        return Response({"message": "Reward completed successfully."})
    except Reward.DoesNotExist:
        return Response({"error": "Reward not found."}, status=404)
