from django.db import models
from django.apps import apps


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    difficulty = models.IntegerField(choices=[(0, 'Facile'), (1, 'Moyen'), (2, 'Difficile')])
    xp_reward = models.IntegerField(default=10)
    estimated_duration = models.DurationField()
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def complete_task(self):
        # if not self.completed:
        self.completed = True
        self.save()
        self.update_quests()
        self.update_rewards()

    def uncomplete_task(self):
        # if self.completed:
        self.completed = False
        self.save()
        self.update_quests()

    def update_quests(self):
        for quest in self.quests.all():
            quest.check_progress()

    def delete(self, *args, **kwargs):
        quests = self.quests.all()
        super().delete(*args, **kwargs)
        # Vérifier les quêtes associées après suppression
        for quest in quests:
            quest.check_progress()

    def update_rewards(self):
        Reward = apps.get_model('rewards', 'Reward')
        rewards = Reward.objects.all()
        for reward in rewards:
            reward.check_completion()

    def __str__(self):
        return self.title


class Quest(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    progress = models.IntegerField(default=0)
    tasks = models.ManyToManyField(Task, related_name="quests")
    completed = models.BooleanField(default=False)
    xp_reward = models.IntegerField(default=100)  # Récompense en XP pour la complétion de la quête
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def check_progress(self):
        total_tasks = self.tasks.count()
        completed_tasks = self.tasks.filter(completed=True).count()
        if total_tasks > 0:
            self.progress = int((completed_tasks / total_tasks) * 100)
        if self.progress == 100:
            self.complete_quest()
        else:
            self.completed = False
        self.save()

    def complete_quest(self):
        if not self.completed:
            self.completed = True
            self.save()
            self.update_rewards()

    def update_rewards(self):
        Reward = apps.get_model('rewards', 'Reward')
        rewards = Reward.objects.all()
        for reward in rewards:
            reward.check_completion()

    def __str__(self):
        return self.name