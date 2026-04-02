from django.urls import path
from django.views.generic.edit import CreateView

from bboard.models import Bb
from bboard.views import (index, by_rubric, BbCreateView,
                          add, add_save, add_and_save, bb_detail,
                          BbRubricBbsView, IndexView, BbDetailView, BbDeleteView,
                          api_rubrics, api_rubrics_detail)
from django.urls import path
from testapp.views import UserCreateView

app_name = 'bboard'

urlpatterns = [
    path('api/v1/rubrics/<int:pk>/', api_rubrics_detail),
    path('api/v1/rubrics/', api_rubrics),

    path('add/', BbCreateView.as_view(), name='add'),
    # path('add/', CreateView.as_view(model=Bb,
    #                                 template_name='create.html',
    #                                 fields='__all__'), name='add'),

    # path('add/', add_and_save, name='add'),

    # path('rubric/<int:rubric_id>/', by_rubric, name='by_rubric'),
    path('rubric/<int:rubric_id>/', BbRubricBbsView.as_view(), name='by_rubric'),

    # path('bb/<int:bb_id>/', bb_detail, name='bb_detail'),
    path('bb/<int:pk>/', BbDetailView.as_view(), name='bb_detail'),
    path('bb/delete/<int:pk>/', BbDeleteView.as_view(), name='bb_delete'),

    #USER
    path('users/create/', UserCreateView.as_view(), name='user-create'),



    path('', index, name='index'),
    # path('', IndexView.as_view(), name='index'),
]
