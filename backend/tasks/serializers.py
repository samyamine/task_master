from rest_framework import serializers
from .models import Task, Quest


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ('id', "title", "description", "completed", "difficulty", "deadline", "xp_reward", "estimated_duration", "created_at", "updated_at")
        fields = ('id', "title", "description", "completed", "difficulty", "deadline", "xp_reward", "created_at", "updated_at")


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('id', "name", "description", "progress", "tasks", "completed", "xp_reward", "created_at")