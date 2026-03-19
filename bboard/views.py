from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, Http404, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.template import loader
from django.template.loader import get_template, render_to_string
from django.urls import reverse_lazy, reverse
from django.views.decorators.http import require_http_methods, require_GET, require_POST, require_safe
from django.views.generic import CreateView
from django.db.models import Count
from django.http import JsonResponse, HttpResponseNotAllowed
from .models import Task
import json


from bboard.forms import BbForm
from bboard.models import Bb, Rubric


def index(request):
    bbs = Bb.objects.order_by('-published')
    rubrics = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
    context = {'bbs': bbs, 'rubrics': rubrics}

    return render(request, 'index.html', context)


def by_rubric(request, rubric_id):
    bbs = Bb.objects.filter(rubric=rubric_id)
    rubrics = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
    current_rubric = Rubric.objects.get(pk=rubric_id)

    context = {'bbs': bbs, 'rubrics': rubrics,
               'current_rubric': current_rubric}

    # url = reverse('by_rubric', kwargs={'rubric_id': 2})

    return render(request, 'by_rubric.html', context)




class BbCreateView(CreateView):
    template_name = 'create.html'
    form_class = BbForm
    success_url = reverse_lazy('bboard:index')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['rubrics'] = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
        return context


def add(request):
    bbf = BbForm()
    context = {'form': bbf}
    return render(request, 'create.html', context)

def add_save(request):
    bbf = BbForm(request.POST)
    if bbf.is_valid():
        bbf.save()
        return HttpResponseRedirect(reverse('bboard:by_rubric',
                 kwargs={'rubric_id': bbf.cleaned_data['rubric'].pk}))
    else:
        context = {'form': bbf}
        return render(request, 'create.html', context)

def add_and_save(request):
    rubrics = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
    if request.method == 'POST':
        bbf = BbForm(request.POST)
        if bbf.is_valid():
            bbf.save()
            return HttpResponseRedirect(reverse('bboard:by_rubric',
                       kwargs={'rubric_id': bbf.cleaned_data['rubric'].pk}))
        else:
            context = {'form': bbf, 'rubrics': rubrics}
            return render(request, 'create.html', context)
    else:
        bbf = BbForm()
        context = {'form': bbf, 'rubrics': rubrics}
        return render(request, 'create.html', context)


@require_http_methods(['GET', 'POST'])
def bb_detail(request, bb_id):
    try:
        # bb = Bb.objects.get(pk=bb_id)
        bb = get_object_or_404(Bb, pk=bb_id)
        rubrics = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
        context = {'bb': bb, 'rubrics': rubrics}
    except Bb.DoesNotExist:
        # return HttpResponseNotFound('Такое объявление не существует')
        return Http404('Такое объявление не существует')
    return render(request, 'bb_detail.html', context)
    # return redirect('bboard:by_rubric', rubric_id=bb.rubric.pk)


# def bb_detail(request, bb_id):
#     bb = Bb.objects.get(pk=bb_id)
#     # data = {'title': 'Мотоцикл', 'content': 'Старый', 'price': 10_000.0}
#     data = {'title': bb.title, 'content': bb.content, 'price': bb.price}
#     return JsonResponse(data)

def get_all_tasks(request):
    if request.method == 'GET':
        tasks = Task.objects.all().values()
        return JsonResponse(list(tasks), safe=False)
    return HttpResponseNotAllowed(['GET'])



def get_task(request, task_id):
    if request.method == 'GET':
        try:
            task = Task.objects.get(id=task_id)
            return JsonResponse({
                'id': task.id,
                'title': task.title,
                'description': task.description,
                'created_at': task.created_at
            })
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found'}, status=404)
    return HttpResponseNotAllowed(['GET'])



def create_task(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        task = Task.objects.create(
            title=data.get('title'),
            description=data.get('description', '')
        )
        return JsonResponse({'id': task.id}, status=201)
    return HttpResponseNotAllowed(['POST'])



def delete_task(request, task_id):
    if request.method == 'DELETE':
        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return JsonResponse({'message': 'Deleted successfully'})
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found'}, status=404)
    return HttpResponseNotAllowed(['DELETE'])
