from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse, Http404
from django.views.generic import TemplateView
from django.db.models import Prefetch, Q, Aggregate, CharField
from django.contrib import messages
import re, random
import sys, os
from project_xion_2018 import custom_function


class GroupConcat(Aggregate):
    function = 'GROUP_CONCAT'
    template = '%(function)s(%(distinct)s%(expressions)s%(ordering)s%(separator)s)'

    def __init__(self, expression, distinct=False, ordering=None, separator=',', **extra):
        super(GroupConcat, self).__init__(
            expression,
            distinct='DISTINCT ' if distinct else '',
            ordering=' ORDER BY %s' % ordering if ordering is not None else '',
            separator=' SEPARATOR "%s"' % separator,
            output_field=CharField(),
            **extra
        )

# Home
#-------------------------------------------------------------
class IndexView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Page_Header_Image
            homepage_slides = Page_Header_Image.objects.filter(publish__exact='1').order_by('sorting','title').exclude(title__exact = 'Feedback Page Background Image')
            
            return render(
                    request,
                    'index.html',
                    context={ 
                            'page_type':"Index",
                            'page_title':"",
                            'homepage_slides':homepage_slides,
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

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
# About
#-------------------------------------------------------------
class AboutView(TemplateView):
    def get(self, request, **kwargs):
        try:
            page_title = "About Us"
            from .models import About_Page, About_Image_Group, About_Image
            about_info = About_Page.objects.filter(publish__exact='1').order_by('sorting','title').prefetch_related(
                            Prefetch(
                                "about_image_group",
                                queryset=About_Image_Group.objects.filter(publish__exact='1').order_by('sorting','title').prefetch_related(
                                    Prefetch(
                                        "about_image",
                                        queryset=About_Image.objects.filter(publish__exact='1').order_by('sorting'),
                                        to_attr="image"
                                    )
                                 ),
                                to_attr="image_group"
                            )
                         )

            return render(
                    request,
                    'about.html',
                    context={ 
                            'page_type':page_title,
                            'page_title':page_title,
                            'about_info':about_info,

                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
#------------------------------------------------------------- 
# Location / Office
#-------------------------------------------------------------
class LocationView(TemplateView):
    def get(self, request, **kwargs):
        try:
            page_title = "Offices"
            from .models import Office
            page_info = Office.objects.filter(publish__exact='1').order_by('sorting','title').all()

     
            return render(
                    request,
                    'location.html',
                    context={ 
                            'page_type':page_title,
                            'page_title':page_title,
                            'page_info':page_info,
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
#-------------------------------------------------------------


# Project
#-------------------------------------------------------------
class ProjectView(TemplateView):
    def get(self, request, **kwargs):
        try:
            page_title = "Projects"
            from django_countries import countries
            from .models import List_Type, List_Service, Project
            
            type_list = List_Type.objects.filter(publish__exact='1').order_by('sorting','title').all()
            service_list = List_Service.objects.filter(publish__exact='1').order_by('sorting','title').all()
            country_list = Project.objects.filter(publish__exact='1').values('country').distinct().order_by('country')
            project_list = Project.objects.filter(publish__exact='1').order_by('sorting','title').all()

            for cn in country_list:
                cn['name'] = dict(countries)[cn['country']] #
                 
            return render(
                    request,
                    'project.html',
                    context={ 
                            'page_type':"Projects",
                            'page_title':page_title,
                            'type_list':type_list,
                            'service_list':service_list,
                            'country_list':country_list,
                            'project_list':project_list,
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404


class ProjectDetailView(TemplateView):
    def get(self, request, **kwargs):
        try:
            if kwargs['slug']:
                from .models import Project, Project_People
                project_info = Project.objects.get(publish__exact='1', slug__exact=kwargs['slug'])
                director_list = Project_People.objects.filter(publish__exact='1', project__exact=project_info.id).order_by('sorting', 'people__name').all()
                service_list = Project.objects.filter(publish__exact='1', slug__exact=kwargs['slug']).values('service__title').all()
                for service in service_list:
                    if service['service__title'] is None:
                        service_list = {}
                page_title = project_info.title
                if project_info:
                    return render(
                            request,
                            'project_detail.html',
                            context={ 
                                    'page_type':"Projects",
                                    'page_title':page_title,
                                    'project_info':project_info,
                                    'director_list':director_list,
                                    'service_list':service_list,
                                    },
                            )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
#-------------------------------------------------------------

# Search
#-------------------------------------------------------------
class SearchView(TemplateView):
    def get(self, request, **kwargs):
        try:
            page_title = "Search"
            return render(
                request,
                'search.html',
                context={
                        'page_type':page_title,
                        'page_title':page_title
                        }
            )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404


class ProjectSearch():
    def search_filter(request):
        try:
            if 'page' in request.GET:
                page = request.GET['page']

                if 'Project' in page or 'Index' in page or 'Search' in page:
                    kwargs = {}

                    # Dynamic Filtering Option. 'if True' Just use to group all filter option for easy view on IDE
                    if True:
                        if 'Index' in page:
                            kwargs['enable_on_homepage__exact'] = 1
                            kwargs['sorting__isnull'] = False

                        try:
                            type = request.GET['type']
                            if len(type) > 0:
                                kwargs['type__title__icontains'] = type
                        except:
                            type = ""

                        try:
                            service = request.GET['service']
                            if len(service) > 0:
                                kwargs['service__title__icontains'] = service
                        except:
                            service = ""

                        try:
                            country = request.GET['country']
                            if len(country) > 0:
                                kwargs['country__icontains'] = country
                        except:
                            country = ""

                        try:
                            search_keyword = request.GET['search_keyword']
                            if len(search_keyword) > 1:
                                kwargs['title__icontains'] = search_keyword
                        except:
                            search_keyword = ""

                    from .models import Project, Setting
                    projects_list = Project.objects.filter(publish__exact='1', **kwargs).distinct().order_by('title')

                    if 'Project' in page:
                        projects_setting = Setting.objects.values('value', 'hint').get(name__exact='web_setting_project_page')
                        
                        show_quantity = int(projects_setting['value'])
                        show_class = projects_setting['hint']
                    elif 'Index' in page:
                        projects_setting = Setting.objects.values('value', 'hint').get(name__exact='web_setting_project_mainpage')
                        show_quantity = int(projects_setting['value'])
                        show_class = projects_setting['hint']

                        #Set to Dynamic & Random display or Fixed 

                        if True:
                            projects_list = sorted(projects_list, key=lambda o: (o.sorting, o.title))
                            projects_list = projects_list[:show_quantity]
                        else:
                            projects_list = sorted(projects_list[:show_quantity*2], key=lambda x: random.random())
                            projects_list = projects_list[:show_quantity]
                            projects_list = sorted(projects_list, key=lambda o: (o.sorting, o.title))

                    else:
                        show_quantity = None
                        show_class = None

                    return render(
                                request, 
                                'project_card.html',
                                context={
                                    'page': page, 
                                    'projects_list': projects_list, 
                                    'show_quantity': show_quantity, 
                                    'show_class': show_class, 
                                }
                            )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        return render(request, 'search_html_filter.html', {'projects_list': []})
#-------------------------------------------------------------

# Feedback
#-------------------------------------------------------------
class FeedbackView(TemplateView):
    def get(self, request, **kwargs):
        try:
            page_title = "Feedback"
            from .models import List_Feedback_Enquiry_Type, Office, Page_Header_Image
            feedback_list = List_Feedback_Enquiry_Type.objects.filter(publish__exact='1').order_by('sorting', 'type')
            page_info = Office.objects.filter(publish__exact='1').order_by('sorting','title').all()
            homepage_slides = Page_Header_Image.objects.filter(publish__exact='1', title__exact = 'Feedback Page Background Image').order_by('sorting','title')[0]
          
            
            return render(
                request,
                'feedback.html',
                context={
                        'page_type':page_title,
                        'page_title':page_title,
                        'feedback_list':feedback_list,
                        'page_info':page_info,
						'homepage_slides':homepage_slides,
                    }
            )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

    def post(self, request, **kwargs):
        try:
            page_title = "Feedback"
            from .models import Setting, Feedback, List_Feedback_Enquiry_Type, Page_Header_Image, Office
            feedback_list = List_Feedback_Enquiry_Type.objects.filter(publish__exact='1').order_by('sorting', 'type')
            page_info = Office.objects.filter(publish__exact='1').order_by('sorting','title').all()
            homepage_slides = Page_Header_Image.objects.filter(publish__exact='1', title__exact = 'Feedback Page Background Image').order_by('sorting','title')[0]

            if request.method == 'POST':
                b_process = True
                tf_name = request.POST.get('tf_name', '')
                tf_company = request.POST.get('tf_company', '')
                tf_contact = request.POST.get('tf_contact', '')
                tf_co_code = request.POST.get('tf_co_code', '')
                tf_area_code = request.POST.get('tf_area_code', '')
                tf_comments = request.POST.get('tf_comments', '')
                tf_email = request.POST.get('tf_email', '')
                tf_enquiry_type = request.POST.get('tf_enquiry_type', '')
                cb_pdpa = request.POST.get('cb_pdpa', '')

                
                user_ip = get_client_ip(request);

                response_json={
                        "tf_name" : {
                                    "value" : tf_name,
                                    "message" : '',
                                    },
                        "tf_company" : {
                                    "value" : tf_company,
                                    "message" : '',
                                    },
                        "tf_contact" : {
                                    "value" : tf_contact,
                                    "message" : '',
                                    },
                        "tf_co_code" : {
                                    "value" : tf_co_code,
                                    "message" : '',
                                    },
                        "tf_area_code" : {
                                    "value" : tf_area_code,
                                    "message" : '',
                                    },
                        "tf_comments" : {
                                    "value" : tf_comments,
                                    "message" : '',
                                    },
                        "tf_email" : {
                                    "value" : tf_email,
                                    "message" : '',
                                    },
                        "tf_enquiry_type" : {
                                    "value" : int(tf_enquiry_type),
                                    "message" : '',
                                    },
                        "cb_pdpa" : {
                                    "value" : cb_pdpa,
                                    "message" : '',
                                    },
                    }

                #Validation
                if b_process:
                    # Name-----------------------------------------------------------------------------------------------
                    if len(tf_name) < 3:
                        b_process = False
                        response_json['tf_name']['message'] =  response_json['tf_name']['message']+' Your Name Is Too Short. '

                    if len(tf_name) > 100:
                        b_process = False
                        response_json['tf_name']['message'] =  response_json['tf_name']['message']+' Your Name Is Too Long. '

                    if not re.match(r'^[0-9a-zA-Z ,.&@()+\'\/\s-]*$', tf_name):
                        b_process = False
                        response_json['tf_name']['message'] = response_json['tf_name']['message']+' Your Name Contain Invalid Sysmbol. '


                    # company-----------------------------------------------------------------------------------------------
                    if len(tf_company) > 0 and len(tf_company) < 3:
                        b_process = False
                        response_json['tf_company']['message'] =  response_json['tf_company']['message']+" Your Company's Name Is Too Short. "

                    if not re.match(r'^[0-9a-zA-Z ,.!&@()+\'\/\s-]*$', tf_company):
                        b_process = False
                        response_json['tf_company']['message'] =  response_json['tf_company']['message']+" Your Company's Name Contain Invalid Sysmbol. "

                    # contact-----------------------------------------------------------------------------------------------
                    if len(tf_contact) >0 or len(tf_co_code) >0 or len(tf_area_code) >0:
                        if len(tf_contact) <= 4 or len(tf_co_code) == 0 or len(tf_area_code) == 0:
                            b_process = False
                            response_json['tf_contact']['message'] = response_json['tf_contact']['message']+" Please fill in Country Code, Area Code and Contact Number. "

                        if not re.match(r'^\s*\d*\s*$', tf_co_code):
                            b_process = False
                            response_json['tf_contact']['message'] = response_json['tf_contact']['message']+" Invalid Country Code. "
                        if not re.match(r'^\s*\d*\s*$', tf_area_code):
                            b_process = False
                            response_json['tf_contact']['message'] = response_json['tf_contact']['message']+" Invalid Area Code. "
                        if not re.match(r'^\s*\d*\s*$', tf_contact):
                            b_process = False
                            response_json['tf_contact']['message'] = response_json['tf_contact']['message']+" Invalid Contact Number. "
                
                    # contact-----------------------------------------------------------------------------------------------
                    if not re.match(r'^[0-9a-zA-Z ,.@()+\'\/\s-]*$', tf_comments):
                        b_process = False
                        response_json['tf_comments']['message'] = " Comments is invalid, Please write your message."

                    # Email-----------------------------------------------------------------------------------------------
                    if len(tf_email) <=5 or not re.match(r'[\w\.-]+@[\w\.-]+(\.[\w]+)+', tf_email):
                        b_process = False
                        response_json['tf_email']['message'] = "Email is invalid"
                        
                    if cb_pdpa != "on":
                        b_process = False
                        response_json['cb_pdpa']['message'] = "You must agree with Personal Data Protection Act (PDPA) before submitting."

                    if len(tf_enquiry_type)==0:
                        b_process = False
                        response_json['tf_enquiry_type']['message'] = " Invalid enquiry type."
                
                if b_process == True:
                    if tf_name and tf_email:
                        feedback_email_subject = 'Others'
                        feedback_list_type = List_Feedback_Enquiry_Type.objects.get(publish__exact='1', id__exact=tf_enquiry_type)

                        #Save feedback form
                        feedback = Feedback()
                        feedback.name = tf_name
                        feedback.compname = tf_company
                        feedback.contact = tf_contact
                        feedback.country_code = tf_co_code
                        feedback.area_code = tf_area_code
                        feedback.email = tf_email
                        feedback.type_enquiry = feedback_list_type
                        feedback.description = tf_comments
                        feedback.details_trail = user_ip
                        feedback.save()
                        
                        try:
                            #for email sending

                            from django.conf import settings
                            if settings.DEBUG == False:
                                import smtplib
                                from email.mime.multipart import MIMEMultipart
                                from email.mime.text import MIMEText

                                website_title = Setting.objects.filter(name__exact='web_setting_title').first()
                                website_title_value = ""
                                if website_title:
                                    website_title_value = website_title.value

                                #Email feedback form
                                #Default email to send
                                if feedback_list_type:
                                    email_to = feedback_list_type.email_to
                                    feedback_email_subject = feedback_list_type.type

                                if email_to and len(email_to) > 5:
                                    pass
                                else:
                                    default_feedback_email = Setting.objects.get(name__exact='feedback_to_email')
                                    if default_feedback_email:
                                        email_to = default_feedback_email.value

                                if email_to and len(email_to) > 5:
                                    pass
                                else:
                                    raise ValueError('Feedback Email Address Not Found') 

                                mailserver = smtplib.SMTP('smtp.office365.com',587)
                                # identify ourselves to smtp gmail client
                                mailserver.ehlo()
                                # secure our email with tls encryption
                                mailserver.starttls()
                                # re-identify ourselves as an encrypted connection
                                mailserver.ehlo()
                                mailserver.login('wwwuser@ong-ong.com', 'n1pp0n1chib@n')

                                msg = MIMEMultipart()
                                msg['Subject'] = '%s - Corporate Website Contact Form for Enquiry Type [%s]' % (website_title_value, feedback_email_subject)
                                msg['From'] = 'wwwuser@ong-ong.com'
                                msg['To'] = email_to
                                message = "Name : %s\nEmail : %s\nContact Number : [%s][%s] %s\nComments : %s\n\n"% ( tf_name, tf_email, tf_co_code, tf_area_code, tf_contact, tf_comments )
                                msg.attach(MIMEText(message))

                                mailserver.sendmail(msg['From'] , msg['To'], msg.as_string())
                                mailserver.quit()
                        except:
                            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
                            #raise Exception(sys.exc_info()) 
                            pass

                        messages.success(request, "Thanks for your feedback")
                        return redirect('/feedback/')
                    
                elif b_process == False:
                    messages.warning(request, 'Error while submit feedback form, Please try again.')
                    return render(request, 'feedback.html',
                                context={
                                        'page_type':page_title,
                                        'page_title':page_title,
                                        'feedback_response':response_json, 
                                        'feedback_list':feedback_list,
										'page_info':page_info,
			                            'homepage_slides':homepage_slides,
                                        
                                        }
                                    )
        except:
            messages.warning(request, 'Error while submit feedback form, Please try again.')
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        return redirect('/feedback/')
#-------------------------------------------------------------



# Custom Function
#-------------------------------------------------------------
def get_client_ip(request):
    try:
        from ipware import get_client_ip
        ip, is_routable = get_client_ip(request)
        USER_AGENT = request.META['HTTP_USER_AGENT']

        if ip :
            if is_routable:
                ip = "The client's IP address is publicly routable on the Internet : " +str(ip)
            else:
                ip = "The client's IP address is private : " +str(ip)

            return ip + "\nHTTP_USER_AGENT : " + USER_AGENT
        else:
            return "HTTP_USER_AGENT : " + USER_AGENT
    except:
        custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
    return ''
#-------------------------------------------------------------

