from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer, QuestSerializer
from .models import Task, Quest


# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class QuestViewSet(viewsets.ModelViewSet):
    serializer_class = QuestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Quest.objects.filter(user=self.request.user)





# class TaskView(viewsets.ModelViewSet):
#     serializer_class = TaskSerializer
#     queryset = Task.objects.all()
#
#
# class QuestView(viewsets.ModelViewSet):
#     serializer_class = QuestSerializer
#     queryset = Quest.objects.all()





# from rest_framework.permissions import IsAuthenticated
#
# class TaskViewSet(viewsets.ModelViewSet):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]
#
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
#
# class QuestViewSet(viewsets.ModelViewSet):
#     queryset = Quest.objects.all()
#     serializer_class = QuestSerializer
#     permission_classes = [IsAuthenticated]
#
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
