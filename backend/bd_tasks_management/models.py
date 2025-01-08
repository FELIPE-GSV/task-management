from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    finish_at = models.DateTimeField(null=True, blank=True)
    complete = models.BooleanField(default=False)
    priority = models.BooleanField(default=False)

    def __str__(self):
        return self.title
