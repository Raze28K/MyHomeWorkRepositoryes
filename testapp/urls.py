from django.urls import path

from .views import task_detail, tasks_list, users_list

app_name = "testapp"

urlpatterns = [
    path("tasks/", tasks_list, name="tasks_list"),
    path("tasks/<int:pk>/", task_detail, name="task_detail"),
    path("users/", users_list, name="users_list"),
]
