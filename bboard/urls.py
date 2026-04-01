from django.urls import path

from bboard.views import (
    AboutView,
    BbCreateView,
    BbDeleteView,
    BbDetailView,
    BbRubricBbsView,
    IndexView,
    SearchTasksView,
    StatsView,
    TemplateTagsDemoView,
    TodayTasksView,
)

app_name = 'bboard'

urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("add/", BbCreateView.as_view(), name="add"),
    path("rubric/<int:rubric_id>/", BbRubricBbsView.as_view(), name="by_rubric"),
    path("bb/<int:pk>/", BbDetailView.as_view(), name="bb_detail"),
    path("bb/delete/<int:pk>/", BbDeleteView.as_view(), name="bb_delete"),
    path("today/", TodayTasksView.as_view(), name="today"),
    path("search/", SearchTasksView.as_view(), name="search"),
    path("stats/", StatsView.as_view(), name="stats"),
    path("about/", AboutView.as_view(), name="about"),
    path("template-tags/", TemplateTagsDemoView.as_view(), name="template_tags_demo"),
]
