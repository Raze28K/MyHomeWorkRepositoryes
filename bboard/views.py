from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, Http404, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.template import loader
from django.template.loader import get_template, render_to_string
from django.urls import reverse_lazy, reverse
from django.views.decorators.http import require_http_methods, require_GET, require_POST, require_safe
from django.views.generic.base import View, TemplateView
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, DeleteView
from django.db.models import Count

from bboard.forms import BbForm
from bboard.models import Bb, Rubric
from django.core.paginator import Paginator


def index (request):
    bbs = Bb.objects.order_by('-published')
    rubrics = Rubric.objects.annotate(cnt = Count('bb')).filter(cnt__gt=0)

    paginator = Paginator(bbs,2)
    if 'page' in request.GET:
        page_num = request.GET['page']
    else:
        page_num = 1

    page = paginator.get_page(page_num)
    context = {'rubrics': rubrics,'page': page, 'bbs': page.object_list}
    return  render(request,'index.html',context)


class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['bbs'] = Bb.objects.order_by('-published')
        context['rubrics'] = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
        return context


def by_rubric(request, rubric_id):
    bbs = Bb.objects.filter(rubric=rubric_id)
    rubrics = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
    current_rubric = Rubric.objects.get(pk=rubric_id)

    paginator = Paginator(bbs, 2)
    if 'page' in request.GET:
        page_num = request.GET['page']
    else:
        page_num = 1

    page = paginator.get_page(page_num)

    context = {'page': page,'bbs': page.object_list, 'rubrics': rubrics,
               'current_rubric': current_rubric}

    # url = reverse('by_rubric', kwargs={'rubric_id': 2})

    return render(request, 'by_rubric.html', context)


# class BbRubricBbsView(TemplateView):
#     template_name = 'by_rubric.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['bbs'] = Bb.objects.filter(rubric=context['rubric_id'])
#         context['rubrics'] = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
#         context['current_rubric'] = Rubric.objects.get(pk=context['rubric_id'])
#         return context


class BbRubricBbsView(ListView):
    template_name = 'by_rubric.html'
    context_object_name = 'bbs'

    def get_queryset(self):
        return Bb.objects.filter(rubric=self.kwargs['rubric_id'])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['rubrics'] = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
        context['current_rubric'] = Rubric.objects.get(pk=self.kwargs['rubric_id'])
        return context


# class BbCreateView(View):
#     def get(self, request, *args, **kwargs):
#         form = BbForm()
#         context = {'form': form, 'rubrics': Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)}
#         return render(request, 'create.html', context)
#
#     def post(self, request, *args, **kwargs):
#         form = BbForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return HttpResponseRedirect(
#                 reverse('bboard:by_rubric',
#                         kwargs={'rubric_id': form.cleaned_data['rubric'].pk}))
#         else:
#             context = {'form': form, 'rubrics': Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)}
#             return render(request, 'create.html', context)


class BbCreateView(CreateView):
    template_name = 'create.html'
    form_class = BbForm
    # success_url = reverse_lazy('bboard:index')
    # success_url = '/bb/{id}'
    success_url = '/rubric/{rubric_id}'

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

class BbDetailView(DetailView):
    model = Bb
    # template_name = 'bb_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['rubrics'] = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
        return context


class BbDeleteView(DeleteView):
    model = Bb
    success_url = '/rubric/{rubric_id}'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['rubrics'] = Rubric.objects.annotate(cnt=Count('bb')).filter(cnt__gt=0)
        return context
