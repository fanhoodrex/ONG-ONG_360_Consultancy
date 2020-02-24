from django.db import models
from django.core.files import File
from immortal_2020 import custom_function
import sys, os


#django-countries
#-------------------------------------------------------------
from django_countries.fields import CountryField

#django-uuslug
#-------------------------------------------------------------
from uuslug import uuslug

# django-tinymce
#-------------------------------------------------------------
from tinymce.models import HTMLField

# Snippets
#-------------------------------------------------------------
def get_project_directory_upload_path(instance, filename):
    return os.path.join("project", "%s" % instance.slug, filename)

def get_trend_directory_upload_path(instance, filename):
    return os.path.join("trend", "%s" % instance.slug, filename)

def has_changed(instance, field):
    try:
        if not instance.pk:
            return True

        old_value = instance.__class__._default_manager.filter(pk=instance.pk).values(field).get()[field]
        return not getattr(instance, field) == old_value
    except:
        custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
    return False
#-------------------------------------------------------------



# Option / Listing
#-------------------------------------------------------------
PAGE_CHOICES = (
    ('1','Main Page'),
    ('2','Work'),
    ('3','Trends'),
    ('4','Scope'),
    ('5','Contact'),
)

THUMBNAIL_HOVER_EFFECT = (
    ('zoom_in_overlay','Zoom In With Black Overlay'),
    ('zoom_in','Zoom In'),
    ('to_color','Grayscale to Color'),
)

CONTENT_ROW_STYLE = (
    ('span_full_width','Span Row Image Cover Full Witdh'),
    ('span_align_center','Span Row Content Align Center'),
    ('span_align_left','Span Row Content Align Left'),
    ('half_align_left','Content Align Left'),
)

class Project_Type_List(models.Model):
    title = models.CharField(max_length=150, null=False, blank=False)
    sorting = models.IntegerField(default=100)
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = 'List Project Types'
        verbose_name_plural = 'List Project Types'
        ordering = ['sorting', 'title']

    def __str__(self):
        return self.title

class Service_Scope_List(models.Model):
    title = HTMLField(max_length=150, null=False, blank=False)
    sorting = models.IntegerField(default=100)
    publish = models.NullBooleanField(default=True)
    
    class Meta:
        verbose_name = 'List Service Scope'
        verbose_name_plural = 'List Service Scope'
        ordering = ['sorting', 'title']

    def __str__(self):
        return self.title
#-------------------------------------------------------------


# Basic / Setting
#-------------------------------------------------------------
class Setting(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=500,null=True, blank=True)
    value = models.TextField(max_length=1000,null=True, blank=True)
    image = models.FileField(upload_to='setting/',null=True, blank=True)
    hint = models.TextField(max_length=255,null=True, blank=True)
    publish = models.NullBooleanField(default=True)
    font_hex_color = models.CharField(max_length=50, help_text="Font color in hex, ie: #ffffff. To be displayed for font text overlapping slideshows, only impacts page_header_keywords. Defaulted to white, with black being used for exceptions", default="#ffffff",null=True, blank=True)

    class Meta:
        verbose_name = 'Setting'
        verbose_name_plural = 'Settings'

    def __str__(self):
        return self.name

class Group_Company(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255, null=True, blank=True, help_text="")
    icon = models.FileField(upload_to='group_company_icon/')
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField()

    class Meta:
        verbose_name = 'Group Company'
        verbose_name_plural = 'Group Companies'
        ordering = ['sorting']

    def __str__(self):
        return self.name
"""
class Icons_Class(models.Model):
    name = models.CharField(max_length=255)
    icon_class = models.CharField(max_length=50)
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = 'List Icons Class'
        verbose_name_plural = 'List Icons Class'

    def __str__(self):
        return self.name
"""
class Social_Media(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255, null=True, blank=True, help_text="")
    icon = models.FileField(upload_to='social_media_icon/',blank=True, null=True)
    sorting = models.IntegerField()
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = 'List Social Media Icons'
        verbose_name_plural = 'List Social Media Icons'
        ordering = ['sorting']

    def __str__(self):
        return self.name

class Pdpa(models.Model):
    name = models.CharField(max_length=255)
    body_text = HTMLField()
    url = models.URLField(max_length=255, null=True, blank=True, help_text="If this field is filled up, the footer pdpa url will redirect instead of popup pdpa content from this page")
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = 'PDPA'
        verbose_name_plural = 'PDPA'

class Disclaimer(models.Model):
    name = models.CharField(max_length=255)
    body_text = HTMLField()
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = 'Disclaimer'
        verbose_name_plural = 'Disclaimer'

class Header_Title_Keyword_Setting(models.Model):
    page = models.CharField(max_length=100, choices=PAGE_CHOICES, default='1', help_text="Display This Header or Keyword On Which Page")
    title = models.CharField(max_length=250, null=True, blank=True, help_text='Please type manually, Heading Title To Be Display (If Any)')
    keyword = models.CharField(max_length=100, null=True, blank=True, help_text='Please type manually, Keyword In Header To Be Display (If Any)')
    seo_keyword = models.CharField(max_length=100, null=True, blank=True, help_text='Please type manually, Keyword For SEO (If Any)')
    
    class Meta:
        verbose_name = "Page's Title Keyword Setting"
        verbose_name_plural = "Page's Title Keyword Setting"
        ordering = ['page','title']

    def __str__(self):
        return self.title

# Office / Contact
#-------------------------------------------------------------
class Office(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, editable=False, null=True, blank=True) # hide from admin
    address = HTMLField(null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)
    country = CountryField(max_length=85,null=False)
    google_map = models.URLField(max_length=500,null=True, blank=True)
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField(default=100)

    class Meta:
        verbose_name = "Office"
        verbose_name_plural = "Offices"
        ordering = ['sorting','title']

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.title, instance=self)
        super(Office, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
#-------------------------------------------------------------


# Project
#-------------------------------------------------------------
class Project(models.Model):
    title = models.CharField(max_length=255, help_text="Name Of Project")
    Country = CountryField(default='null')
    slug = models.SlugField(unique=True, editable=False, null=True, blank=True) # hide from admin
    keyword = models.TextField(max_length=500,null=True, blank=True)
    project_type = models.ManyToManyField(Project_Type_List, related_name='project_type', help_text="Project's Type")
    
    thumbnail = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Mandatory, will be shown as all project thumbnails', null=True, blank=False, max_length=250)
    
    publish = models.NullBooleanField(default=True)
    show_on_main = models.NullBooleanField(default=False, help_text='Show On Main Page')
    sorting = models.IntegerField(null=True, blank=True)
    create_at = models.DateTimeField(auto_now=False, auto_now_add=True, null=True, editable=False)
    update_at = models.DateTimeField(auto_now=True, auto_now_add=False, null=True, editable=False)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Project"
        ordering = ['sorting','title']

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.title, instance=self)
        
        imp = custom_function.ImageProcessor()
        if has_changed(self, 'thumbnail' ):
            self.thumbnail = imp.image_resizer(self.thumbnail, self.thumbnail.name, "thumbnail")
        
        super(Project, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class Project_Content(models.Model):
    project_id = models.ForeignKey(Project, blank=False,on_delete=models.CASCADE)

    left_title  = models.CharField(max_length=255, null=True, blank=True)
    left_image = models.ImageField(upload_to = get_project_directory_upload_path, null=True, blank=True)
    left_body_text = HTMLField(null=True, blank=True)

    right_title = models.CharField(max_length=255, null=True, blank=True)
    right_image = models.ImageField(upload_to = get_project_directory_upload_path, null=True, blank=True)
    right_body_text = HTMLField(null=True, blank=True)
    
    row_style = models.CharField(max_length=100, choices=CONTENT_ROW_STYLE, default='span_full_width', help_text="Row Content Layout Style, Only will have affect if right content empty.")

    sorting = models.IntegerField(default=100)
    
    def save(self, *args, **kwargs):
        imp = custom_function.ImageProcessor()
        if has_changed(self, 'left_image' ):
            self.left_image = imp.image_resizer(self.left_image, self.left_image.name, "left_image")
        if has_changed(self, 'right_image' ):
            self.right_image = imp.image_resizer(self.right_image, self.right_image.name, "right_image")
        
        super(Project_Content, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Poject Row Content'
        verbose_name_plural = 'Poject Row Content'
        ordering = ['sorting']
#-------------------------------------------------------------


# Trend
#-------------------------------------------------------------
class Trend(models.Model):
    title = models.CharField(max_length=255, help_text="Trend Title")
    slug = models.SlugField(unique=True, editable=False, null=True, blank=True) # hide from admin
    keyword = models.TextField(max_length=255, help_text="Keyword or Sub-Title to be display on list")
    short_description = models.TextField(max_length=500, help_text="Short Description to be display on list")
    date =  models.DateField()

    thumbnail = models.ImageField(upload_to = get_trend_directory_upload_path, help_text='Mandatory, will be shown as thumbnails', null=False, blank=False)
    thumbnail_font_hex_color = models.CharField(max_length=50, null=True, blank=True, help_text="Font color in hex, ie: #ffffff. To be displayed for font text overlapping slideshows, Defaulted to white.")

    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField(null=True, blank=True)
    create_at = models.DateTimeField(auto_now=False, auto_now_add=True, null=True, editable=False)
    update_at = models.DateTimeField(auto_now=True, auto_now_add=False, null=True, editable=False)

    class Meta:
        verbose_name = "Trend"
        verbose_name_plural = "Trend"
        ordering = ['sorting','title']

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.title, instance=self)
        
        imp = custom_function.ImageProcessor()
        if has_changed(self, 'thumbnail' ):
            self.thumbnail = imp.image_resizer(self.thumbnail, self.thumbnail.name, "thumbnail")
        
        super(Trend, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class Trend_Content(models.Model):
    trend_id = models.ForeignKey(Trend, blank=False,on_delete=models.CASCADE)

    left_title  = models.CharField(max_length=255, null=True, blank=True)
    left_image = models.ImageField(upload_to = get_trend_directory_upload_path, null=True, blank=True)
    left_body_text = HTMLField(null=True, blank=True)

    right_title = models.CharField(max_length=255, null=True, blank=True)
    right_image = models.ImageField(upload_to = get_trend_directory_upload_path, null=True, blank=True)
    right_body_text = HTMLField(null=True, blank=True)
    
    row_style = models.CharField(max_length=100, choices=CONTENT_ROW_STYLE, default='half_align_left', help_text="Row Content Layout Style, Only will have affect if right content empty.")

    sorting = models.IntegerField(default=100)
    
    def save(self, *args, **kwargs):
        imp = custom_function.ImageProcessor()
        if has_changed(self, 'left_image' ):
            self.left_image = imp.image_resizer(self.left_image, self.left_image.name, "left_image")
        if has_changed(self, 'right_image' ):
            self.right_image = imp.image_resizer(self.right_image, self.right_image.name, "right_image")
        
        super(Trend_Content, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Trend Row Content'
        verbose_name_plural = 'Trend Row Content'
        ordering = ['sorting']
#-------------------------------------------------------------