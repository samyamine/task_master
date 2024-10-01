from django.db import models
from django.apps import apps


# Create your models here.
class Reward(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default="")
    xp_reward = models.IntegerField(default=10)
    completed = models.BooleanField(default=False)
    num_tasks = models.IntegerField(default=0)
    num_quests = models.IntegerField(default=0)

    def check_completion(self):
        Task = apps.get_model('tasks', 'Task')
        Quest = apps.get_model('tasks', 'Quest')

        total_completed_tasks = Task.objects.filter(completed=True).count()
        total_completed_quests = Quest.objects.filter(completed=True).count()

        print(total_completed_tasks)
        print(total_completed_quests)

        if total_completed_tasks >= self.num_tasks and total_completed_quests >= self.num_quests:
            self.completed = True
            self.save()

    def __str__(self):
        return self.title
