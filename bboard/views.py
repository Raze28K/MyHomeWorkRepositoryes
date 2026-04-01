from django.db.models import Count, Q
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils import timezone
from django.views.generic.base import TemplateView
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, DeleteView

from bboard.forms import BbForm
from bboard.models import Bb, Rubric


def get_menu_rubrics():
    return Rubric.objects.annotate(cnt=Count("bb")).filter(cnt__gt=0)


class IndexView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["bbs"] = Bb.objects.order_by("-published")
        context["rubrics"] = get_menu_rubrics()
        return context

class BbRubricBbsView(ListView):
    template_name = "by_rubric.html"
    context_object_name = "bbs"

    def get_queryset(self):
        return Bb.objects.filter(rubric=self.kwargs["rubric_id"]).order_by("-published")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        context["current_rubric"] = get_object_or_404(Rubric, pk=self.kwargs["rubric_id"])
        return context

class BbCreateView(CreateView):
    template_name = "create.html"
    form_class = BbForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        return context

    def get_success_url(self):
        return reverse("bboard:by_rubric", kwargs={"rubric_id": self.object.rubric_id})

class BbDetailView(DetailView):
    model = Bb

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        return context


class BbDeleteView(DeleteView):
    model = Bb

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        return context

    def get_success_url(self):
        return reverse("bboard:by_rubric", kwargs={"rubric_id": self.object.rubric_id})


class TodayTasksView(ListView):
    template_name = "today.html"
    context_object_name = "bbs"

    def get_queryset(self):
        today = timezone.localdate()
        return Bb.objects.filter(published__date=today).order_by("-published")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        context["page_title"] = "Задачи на сегодня"
        return context


class SearchTasksView(ListView):
    template_name = "search.html"
    context_object_name = "bbs"

    def get_queryset(self):
        query = self.request.GET.get("q", "").strip()
        if not query:
            return Bb.objects.none()
        return Bb.objects.filter(Q(title__icontains=query) | Q(content__icontains=query)).order_by("-published")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        context["query"] = self.request.GET.get("q", "").strip()
        return context


class StatsView(TemplateView):
    template_name = "stats.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        context["total_tasks"] = Bb.objects.count()
        context["today_tasks"] = Bb.objects.filter(published__date=timezone.localdate()).count()
        context["total_rubrics"] = Rubric.objects.count()
        return context


class AboutView(TemplateView):
    template_name = "about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        return context


class TemplateTagsDemoView(TemplateView):
    template_name = "template_tags_demo.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["rubrics"] = get_menu_rubrics()
        context["teacher_name"] = "Иван Петров"
        context["tasks_demo"] = [
            {"title": "Сделать макет страницы профиля", "done": True, "priority": "high"},
            {"title": "Настроить шаблон с наследованием и include", "done": False, "priority": "high"},
            {"title": "Подключить статический css файл к базовому шаблону", "done": False, "priority": "medium"},
            {"title": "Подготовить страницу статистики", "done": True, "priority": "low"},
        ]
        context["empty_tasks"] = []
        return context
