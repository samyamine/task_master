from django.db.models import Sum
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer, QuestSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task, Quest


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def perform_update(self, serializer):
        instance = serializer.save()
        # instance.update_quests()
        if instance.completed:
            instance.complete_task()
        else:
            instance.uncomplete_task()

    def perform_destroy(self, instance):
        instance.delete()


class QuestView(viewsets.ModelViewSet):
    serializer_class = QuestSerializer
    queryset = Quest.objects.all()


@api_view(['GET'])
def total_xp_view(request):
    total_xp = 0

    completed_tasks = Task.objects.filter(completed=True)
    for task in completed_tasks:
        total_xp += task.xp_reward * (task.difficulty + 1)

    completed_quests = Quest.objects.filter(completed=True)
    quest_xp_sum = completed_quests.aggregate(total_xp=Sum('xp_reward'))

    if quest_xp_sum['total_xp'] is not None:
        quest_xp = quest_xp_sum['total_xp']
    else:
        quest_xp = 0

    total_xp += quest_xp

    return Response({"total_xp": total_xp})

