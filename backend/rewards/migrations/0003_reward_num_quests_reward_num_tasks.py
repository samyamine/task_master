# Generated by Django 5.1.1 on 2024-10-01 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rewards', '0002_reward_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='reward',
            name='num_quests',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='reward',
            name='num_tasks',
            field=models.IntegerField(default=0),
        ),
    ]
