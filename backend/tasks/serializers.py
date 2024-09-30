from rest_framework import serializers
from .models import Task, Quest


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('user',)


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        validated_data['tasks'] = []
        quest = Quest.objects.create(**validated_data)
        return quest
