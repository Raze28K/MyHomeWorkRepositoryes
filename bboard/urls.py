from django.urls import path, re_path

from bboard.views import (index, by_rubric, BbCreateView,
                          add, add_save, add_and_save, bb_detail)

from django.urls import path
from . import views

app_name = 'bboard'

urlpatterns = [
    # path('add/', BbCreateView.as_view(), name='add'),

    path('add/', add_and_save, name='add'),

    path('rubric/<int:rubric_id>/', by_rubric, name='by_rubric'),
    path('bb/<int:bb_id>/', bb_detail, name='bb_detail'),

    path('', index, name='index'),
    path('tasks/', views.get_all_tasks),
    path('tasks/<int:task_id>/', views.get_task),
    path('tasks/create/', views.create_task),
    path('tasks/delete/<int:task_id>/', views.delete_task),
]

# urlpatterns = [
#     re_path(r'^add/$', BbCreateView.as_view(), name='add'),
#     re_path(r'^(?P<rubric_id>[0-9]*)/$', by_rubric, name='by_rubric'),
#     re_path(r'^$', index, name='index'),
# ]
