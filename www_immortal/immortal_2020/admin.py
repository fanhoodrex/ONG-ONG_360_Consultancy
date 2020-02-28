from django.contrib import admin
from . import models

admin.site.site_header = 'Immortal Django administration'

# Basic / Setting
#-------------------------------------------------------------
from .models import Setting
class Setting_Admin(admin.ModelAdmin):
    list_display = ('name', 'description', 'publish')
admin.site.register(Setting, Setting_Admin)

from .models import Project_Type_List
class List_Type_Admin(admin.ModelAdmin):
    list_display = ('title', 'sorting', 'publish',)
admin.site.register(Project_Type_List, List_Type_Admin)

from .models import Social_Media
class Social_Media_Admin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'sorting', 'publish')
admin.site.register(Social_Media, Social_Media_Admin)

from .models import Group_Company
class Group_Company_Admin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'sorting', 'publish',)
admin.site.register(Group_Company, Group_Company_Admin)

from .models import Pdpa
class Pdpa_Admin(admin.ModelAdmin):
    list_display = ('name', 'url', 'publish',)
admin.site.register(Pdpa, Pdpa_Admin)

from .models import Disclaimer
class Disclaimer_Admin(admin.ModelAdmin):
    list_display = ('name', 'publish',)
admin.site.register(Disclaimer, Disclaimer_Admin)

#-------------------------------------------------------------

from .models import Service_Scope_List
class Scope_Admin(admin.ModelAdmin):
    list_display = ('title', 'sorting','publish')
admin.site.register(Service_Scope_List, Scope_Admin)

from .models import Header_Title_Keyword_Setting
class Keyword_Title_Admin(admin.ModelAdmin):
    list_display = ('title','keyword')
admin.site.register(Header_Title_Keyword_Setting, Keyword_Title_Admin)

from .models import Office
class Office_Admin(admin.ModelAdmin):
    list_display = ('title','address','publish','phone','email','country','publish','sorting')
admin.site.register(Office, Office_Admin)

from .models import Project_Content
class Project_Content_Admin(admin.ModelAdmin):
    list_display = ['project_id']
admin.site.register(Project_Content, Project_Content_Admin)

from .models import Trend_Content
class Trend_Content_Admin(admin.ModelAdmin):
    list_display = ['trend_id','row_style']
admin.site.register(Trend_Content, Trend_Content_Admin)

# Below are project and trend ------------------

from .models import Project,Trend

class ProjectInline(admin.StackedInline):
    model = Project_Content # referenceto project content model
    pass

class Project_Admin(admin.ModelAdmin): # create admin in a separate form for project
    list_display = ('title','Country','sorting') # Fields to display in project admin section
    inlines = [ProjectInline]
    pass

admin.site.register(Project, Project_Admin)

class TrendInline(admin.StackedInline):
    model = Trend_Content # referenceto project content model
    pass

class Trend_Admin(admin.ModelAdmin): # create admin in a separate form for project
    list_display = ('title','keyword','short_description','date','sorting') # Fields to display in project admin section
    inlines = [TrendInline]
    pass

admin.site.register(Trend, Trend_Admin)