from django.contrib import admin

# django-image-cropping  
from image_cropping import ImageCroppingMixin


# Basic / Setting
#-------------------------------------------------------------
from .models import Setting
class Setting_Admin(admin.ModelAdmin):
    list_display = ('name', 'description', 'publish')
admin.site.register(Setting, Setting_Admin)

from .models import List_Type
class List_Type_Admin(admin.ModelAdmin):
    list_display = ('title', 'sorting', 'publish',)
admin.site.register(List_Type, List_Type_Admin)

from .models import List_Service
class List_Service_Admin(admin.ModelAdmin):
    list_display = ('title', 'sorting', 'publish',)
admin.site.register(List_Service, List_Service_Admin)

from .models import List_Feedback_Enquiry_Type
class List_Feedback_Enquiry_Type_Admin(admin.ModelAdmin):
    list_display = ('type', 'sorting', 'publish',)
admin.site.register(List_Feedback_Enquiry_Type, List_Feedback_Enquiry_Type_Admin)

from .models import Social_Media
class Social_Media_Admin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'sorting', 'publish')
admin.site.register(Social_Media, Social_Media_Admin)

from .models import Group_Company
class Group_Company_Admin(admin.ModelAdmin):
    list_display = ('name', 'image', 'sorting', 'publish',)
admin.site.register(Group_Company, Group_Company_Admin)

from .models import Pdpa
class Pdpa_Admin(admin.ModelAdmin):
    list_display = ('name', 'url', 'publish',)
admin.site.register(Pdpa, Pdpa_Admin)

from .models import Disclaimer
class Disclaimer_Admin(admin.ModelAdmin):
    list_display = ('name', 'publish',)
admin.site.register(Disclaimer, Disclaimer_Admin)


# Hide From Admin
#-------------------------------------------------------------
from .models import Icons_Class
class Icons_Class_Admin(admin.ModelAdmin):
    list_display = ('name', 'icon_class', 'publish',)
#admin.site.register(Icons_Class, Icons_Class_Admin)
#-------------------------------------------------------------


# Home
#-------------------------------------------------------------
from .models import Page_Header_Image
class Page_Header_Image_Admin(admin.ModelAdmin):
    list_display = ('title', 'keyword', 'sorting', 'image', 'publish',)
    ordering = ('title', 'keyword', 'sorting', 'image', 'publish',)
    list_filter = ('publish',)
    search_fields = ('title', 'keyword', )
admin.site.register(Page_Header_Image, Page_Header_Image_Admin)




#-------------------------------------------------------------


#About
#-------------------------------------------------------------
from .models import About_Page
class About_Page_Admin(admin.ModelAdmin):
    list_display = ('title', 'sorting', 'publish',)
    ordering = ('title', 'sorting', 'publish',)
    list_filter = ('publish',)
    search_fields = ('title', )
admin.site.register(About_Page, About_Page_Admin)

from .models import About_Image_Group
class About_Image_Group_Admin(admin.ModelAdmin):
    list_display = ('title', 'about_page_category', 'sorting', 'publish',)
    ordering = ('title', 'about_category', 'sorting', 'publish',)
    list_filter = ('about_category', 'publish',)
    search_fields = ('title', 'about_category',)
admin.site.register(About_Image_Group, About_Image_Group_Admin)

from .models import About_Image
class About_Image_Admin(admin.ModelAdmin):
    list_display = ('title', 'sorting', 'publish',)
    ordering = ('title', 'sorting', 'publish',)
    list_filter = ('publish',)
    search_fields = ('title',)
admin.site.register(About_Image, About_Image_Admin)


#-------------------------------------------------------------

# Home
#-------------------------------------------------------------
from .models import Office
class Office_Admin(admin.ModelAdmin):
    list_display = ('title', 'address', 'country', 'sorting', 'publish',)
    ordering = ('title', 'address', 'country', 'sorting', 'publish',)
    list_filter = ('publish',)
    search_fields = ('title', 'address', 'country',)
admin.site.register(Office, Office_Admin)
#-------------------------------------------------------------


# Project
#-------------------------------------------------------------
from .models import Project
class Project_Admin(admin.ModelAdmin, ImageCroppingMixin):
    list_display = ('title', 'type', 'country', 'completion_date', 'status', 'sorting', 'publish',)
    ordering = ('title', 'type', 'country', 'completion_date', 'status', 'sorting', 'publish',)
    list_filter = ('type', 'service','publish',)
    search_fields = ('title', 'type', 'service', 'country',)
    #exclude = ('image2','image3','image4','image5',)

admin.site.register(Project, Project_Admin)
#-------------------------------------------------------------


# Feedback
#-------------------------------------------------------------
from .models import Feedback
class Feedback_Admin(admin.ModelAdmin):
    list_display = ('name', 'compname', 'email', 'type_enquiry')
    ordering = ('name', 'compname', 'email', 'type_enquiry' )
    list_filter = ('type_enquiry',)
    search_fields = ('name','email','type_enquiry')
admin.site.register(Feedback, Feedback_Admin)
#-------------------------------------------------------------