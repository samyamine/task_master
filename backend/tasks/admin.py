from django.contrib import admin
from .models import Task, Quest


# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed", "difficulty", "xp_reward", "estimated_duration", "user", "created_at", "updated_at")


class QuestAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "progress", "completed", "xp_reward", "created_at")


admin.site.register(Task, TaskAdmin)
admin.site.register(Quest, QuestAdmin)
# admin.site.register(Task)
# admin.site.register(Quest)
