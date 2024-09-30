from django.contrib.auth.models import User
from django.db import models
from django.conf import settings


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    difficulty = models.IntegerField(choices=[(1, 'Facile'), (2, 'Moyen'), (3, 'Difficile')])
    xp_reward = models.IntegerField(default=10)  # Récompense en XP pour la complétion
    estimated_duration = models.DurationField()  # Durée estimée
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tasks")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def complete_task(self):
        """Marquer la tâche comme complétée et donner la récompense XP à l'utilisateur"""
        if not self.completed:
            self.completed = True
            xp_gained = self.xp_reward * self.difficulty
            self.user.add_xp(xp_gained)
            self.save()

    def __str__(self):
        return self.title


class Quest(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    progress = models.IntegerField(default=0)  # En pourcentage
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="quests")
    tasks = models.ManyToManyField(Task, related_name="quests")
    completed = models.BooleanField(default=False)
    xp_reward = models.IntegerField(default=100)  # Récompense en XP pour la complétion de la quête
    created_at = models.DateTimeField(auto_now_add=True)

    def check_progress(self):
        """Mettre à jour le pourcentage d'avancement en fonction des tâches complétées"""
        total_tasks = self.tasks.count()
        completed_tasks = self.tasks.filter(completed=True).count()
        if total_tasks > 0:
            self.progress = int((completed_tasks / total_tasks) * 100)
        if self.progress == 100:
            self.complete_quest()
        self.save()

    def complete_quest(self):
        """Marquer la quête comme complétée et donner la récompense XP à l'utilisateur"""
        if not self.completed:
            self.user.add_xp(self.xp_reward)
            self.completed = True
            self.save()

    def __str__(self):
        return self.name
