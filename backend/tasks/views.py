from datetime import timedelta
from django.db.models import Sum
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer, QuestSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task, Quest
from django.utils.timezone import now
from django.db.models import Count
from django.db.models.functions import TruncDate


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

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.check_progress()


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


@api_view(['GET'])
def tasks_quests_last_week(request):
    today = now().date()
    week = today - timedelta(days=6)

    task_counts = (
        Task.objects.filter(created_at__date__gte=week)
        .annotate(day=TruncDate('created_at'))
        .values('day')
        .annotate(count=Count('id'))
        .order_by('day')
    )

    quest_counts = (
        Quest.objects.filter(created_at__date__gte=week)
        .annotate(day=TruncDate('created_at'))
        .values('day')
        .annotate(count=Count('id'))
        .order_by('day')
    )

    result = {}

    for task in list(task_counts):
        day = task["day"]
        result[day] = {"day": day, "tasks": task["count"], "quests": 0}

    for quest in list(quest_counts):
        day = quest["day"]
        if day in result:
            result[day]["quests"] = quest["count"]
        else:
            result[day] = {"day": day, "tasks": 0, "quests": quest["count"]}

    result = list(result.values())

    return Response(result)
