from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer, UserSerializer


@api_view(["GET", "POST"])
def tasks_list(request):
    if request.method == "GET":
        tasks = Task.objects.order_by("-created_at")
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    serializer = TaskSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=201)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def task_detail(request, pk):
    task = get_object_or_404(Task, pk=pk)

    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    if request.method == "DELETE":
        task.delete()
        return Response(status=204)

    partial = request.method == "PATCH"
    serializer = TaskSerializer(task, data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def users_list(request):
    users = User.objects.order_by("id")
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
