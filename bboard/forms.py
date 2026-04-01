from django.forms import ModelForm

from bboard.models import Bb


class BbForm(ModelForm):
    class Meta:
        model = Bb
        fields = ("title", "content", "price", "rubric")
        labels = {
            "title": "Задача",
            "content": "Описание задачи",
            "price": "Приоритет (четное число)",
            "rubric": "Категория",
        }
