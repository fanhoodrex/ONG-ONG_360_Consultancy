from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse, Http404, JsonResponse
from django.views.generic import TemplateView
from django.db.models import Prefetch, Q, Aggregate, CharField
from django.contrib import messages
import re, random, sys, os

from immortal_2020 import custom_function


# Home
#-------------------------------------------------------------
class IndexView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Project
            projects = Project.objects.filter(publish='1').order_by('id').values('title','slug','Country','project_type','thumbnail')

            return render(
                    request,
                    'index.html',
                    context={ 
                            'page_type':"Index",
                            'page_title':projects['title'],
                            'prjects':projects                      
                    })
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404("Unable to access the project")
#-------------------------------------------------------------

# Disclaimer
#-------------------------------------------------------------
class DisclaimerView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Disclaimer
            disclaimer = Disclaimer.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            return render(
                    request,
                    'blank.html',
                    context={ 
                            'page_type':disclaimer['name'],
                            'page_title':disclaimer['name'],
                            'body_text':disclaimer['body_text'],
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
#-------------------------------------------------------------

class ProjectDetailView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Project_Content
            projects = Project.objects.filter(publish='1').order_by('id').values('title','slug','keyword','Country','project_type','thumbnail')
            Project_Content = Project_Content.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            return render(
                    request,
                    'project.html',
                    context={ 
                            'project':projects['title'],
                            'project_type':projects['project_type'],
                            'project_keyword':project['keyword']

                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

# Pdpa
#-------------------------------------------------------------
class PdpaView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Pdpa
            pdpa = Pdpa.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            if pdpa['body_text'] and len(pdpa['body_text']) > 10:
                return render(
                        request,
                        'blank.html',
                        context={ 
                                'page_type':pdpa['name'],
                                'page_title':pdpa['name'],
                                'body_text':pdpa['body_text'],
                                },
                        )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        return redirect('http://www.group.ong-ong.com/pdpa')
#-------------------------------------------------------------
class OfficeView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Office
            Office = Office.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            return render(
                    request,
                    'contact.html',
                    context={ 
                            'page_type':Office['name'],
                            'page_title':Office['name'],
                            'body_text':Office['body_text'],
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

class ContactView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Service_Scope_List
            Service_Scope = Service_Scope_List.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            return render(
                    request,
                    'scope.html',
                    context={ 
                            'page_type':Service_Scope['name'],
                            'page_title':Service_Scope['name'],
                            'body_text':Service_Scope['body_text'],
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

class ProjectContentView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Project_Content
            projects_content = Project.objects.filter(publish__exact='1').order_by('id').values('name','body_text')

            return render(
                    request,
                    'project.html',
                    context={ 
                            'page_type':"Index",
                            'page_title':"",
                            'prjects_contnet':projects_content                           
                    })
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
            raise Http404()

class ScopeView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Service_Scope_List
            Service_Scope = Service_Scope_List.objects.filter(publish='1').order_by('id').all()

            context={ 
                'page_type':'',
                'scope_titles':Service_Scope.objects.all()
                }

            return render(
                    request,
                    'templates/scope.html',
                    context)
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

class TrendView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Trend
            Trend = Trend.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            return render(
                    request,
                    'trend.html',
                    context={ 
                            'page_type':Trend['name'],
                            'page_title':Trend['name'],
                            'body_text':Trend['body_text'],
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

class TrendContentView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Trend_Content
            Trend_Content = Trend_Content.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            return render(
                    request,
                    'trend-content.html',
                    context={ 
                            'page_type':Trend_Content['name'],
                            'page_title':Trend_Content['name'],
                            'body_text':Trend_Content['body_text'],
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
