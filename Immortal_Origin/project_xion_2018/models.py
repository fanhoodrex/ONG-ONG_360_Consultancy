from django.db import models
from django.core.files import File
from django.core.exceptions import ValidationError
from project_xion_2018 import custom_function
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

class List_Type(models.Model):
    title = models.CharField(max_length=85,null=False)
    sorting = models.IntegerField(default='100')
    publish = models.NullBooleanField(default=True)
    
    class Meta:
        verbose_name = 'List Type'
        verbose_name_plural = 'List Type'
        ordering = ['sorting']

    def __str__(self):
        return self.title

class List_Service(models.Model):
    title = models.CharField(max_length=85,null=False)
    sorting = models.IntegerField(default='100')
    publish = models.NullBooleanField(default=True)
    
    class Meta:
        verbose_name = 'List Service'
        verbose_name_plural = 'List Service (Only for RH)'
        ordering = ['sorting']

    def __str__(self):
        return self.title

class List_Designation(models.Model):
    title = models.CharField(max_length=85,null=False)
    sorting = models.IntegerField(default='100')
    publish = models.NullBooleanField(default=True)
    
    class Meta:
        verbose_name = 'List Designation'
        verbose_name_plural = 'List Designation'
        ordering = ['sorting']

    def __str__(self):
        return self.title

class List_Feedback_Enquiry_Type(models.Model):
    type = models.CharField(max_length=255, null=True, blank=True)
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField(default='100')
    email_to = models.EmailField(max_length=255, null=True, blank=True, help_text="Setup each enquiry type to email separately, if no set will send to default email in setting 'feedback_to_email' .")


    class Meta:
        verbose_name = 'List Feedback Enquiry Type'
        verbose_name_plural = 'List Feedback Enquiry Type'
        ordering = ['type']

    def __str__(self):
        return self.type

class Group_Company(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=500)
    image = models.FileField(upload_to='group_company_icon/')
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField()

    class Meta:
        verbose_name = 'Group Company'
        verbose_name_plural = 'Group Companies'
        ordering = ['sorting']

    def __str__(self):
        return self.name

class Icons_Class(models.Model):
    name = models.CharField(max_length=255)
    icon_class = models.CharField(max_length=50)
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = 'List Icons Class'
        verbose_name_plural = 'List Icons Class'

    def __str__(self):
        return self.name

class Social_Media(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=500)
    icon = models.ForeignKey(Icons_Class, blank=True, null=True, on_delete=models.SET_NULL)
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField()

    class Meta:
        verbose_name = 'List Social Media Icons'
        verbose_name_plural = 'List Social Media Icons (Table not in use)'
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
#-------------------------------------------------------------


# About
#-------------------------------------------------------------
def get_project_directory_upload_path(instance, filename):
    return os.path.join("project", "%s" % instance.slug, filename)

class About_Page(models.Model):
    slug = models.SlugField(editable=False, null=True, blank=True) # hide from admin
    title = models.CharField(max_length=255)
    body_text = HTMLField(null=True, blank=True)
    image = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Image Will Auto Resize', null=True, blank=True,  max_length=250)
    keyword = models.TextField(max_length=255, null=True, blank=True)
    image_position = models.CharField(null=True, blank=True, max_length=255, default="right", help_text='Image position in about page, value to be "right" or "left".')
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField()
   
    class Meta:
        verbose_name = "About"
        verbose_name_plural = "About"
        ordering = ['sorting','title']

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.title, instance=self)
        imp = custom_function.ImageProcessor()
        
        if has_changed(self, 'image' ):
            self.image = imp.image_resizer(self.image, self.image.name, "image")
        
        super(About_Page, self).save(*args, **kwargs)

    def __str__(self):
        return self.title 

    

class About_Image_Group(models.Model):
    title = models.CharField(max_length=255)
    keyword = models.TextField(max_length=255, null=True, blank=True)
    background_hex_color = models.CharField(max_length=50, help_text="Background color in hex, ie: #ffffff.", default="#ffffff",null=True, blank=True)
    about_category = models.ForeignKey(About_Page, null=True, on_delete=models.SET_NULL, related_name='about_image_group')
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField()

    class Meta:
        verbose_name = "About Image Group"
        verbose_name_plural = "About Image Group (Only for RH)"
        ordering = ['sorting','title']

    def about_page_category(self):
        return self.about_category.title
    about_page_category.short_description = 'About Page Category'

    def __str__(self):
        return self.title 

class About_Image(models.Model):
    title = models.CharField(max_length=255)
    image = models.FileField(upload_to='about_us_image/')
    image_group = models.ForeignKey(About_Image_Group, null=True, on_delete=models.SET_NULL, related_name='about_image')
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField()

    class Meta:
        verbose_name = "About Image"
        verbose_name_plural = "About Image  (Only for RH)"
        ordering = ['sorting','title']

    def image_group_category(self):
        return self.image_group.title
    image_group_category.short_description = 'Image Group Category'


#-------------------------------------------------------------



# Office
#-------------------------------------------------------------
class Office(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(editable=False, null=True, blank=True) # hide from admin
    address = HTMLField(null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    fax = models.CharField(max_length=255, null=True, blank=True)
    country = CountryField(max_length=85,null=False)
    image = models.FileField(upload_to='office_image/', null=True, blank=True)
    google_map = models.URLField(max_length=500,null=True, blank=True)
    publish = models.NullBooleanField(default=True)
    sorting = models.IntegerField()

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



# People
#-------------------------------------------------------------
class People(models.Model):
    name = models.CharField(max_length=255, help_text="Name")
    slug = models.SlugField(editable=False, null=False, blank=True) # hide from admin
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = "People"
        verbose_name_plural = "Peoples"
        ordering = ['name']

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.name, instance=self)
        super(People, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
#-------------------------------------------------------------



# Project
#-------------------------------------------------------------
class Project(models.Model):
    title = models.CharField(max_length=155, help_text="Name Of Project")
    slug = models.SlugField(editable=False, null=True, blank=True) # hide from admin
    
    type = models.ForeignKey(List_Type, null=True, on_delete=models.SET_NULL, related_name='project_type', help_text="Project's Type")
    service = models.ManyToManyField(List_Service, blank=True, null=True, related_name='project_service', help_text="Project's Services (Only for RH). ")
    country = CountryField(max_length=85, null=False, help_text="Project's Country")

    body_text = HTMLField( help_text="Project's Description" )
    client_name = models.CharField(null=True, blank=True, max_length=155, help_text="Project's Client")
    site_area = models.CharField(null=True, blank=True, max_length=55, help_text="Project's Site Area (Only for RH)")
    gfa = models.CharField(null=True, blank=True, max_length=55, help_text="Project's Gross Floor Area (GFA), only for RH")
    completion_date = models.CharField(null=True, blank=True, max_length=55, help_text="Project's Completion Date")
    status = models.CharField(null=True, blank=True, max_length=55, help_text="Project's Status")

    publish = models.NullBooleanField(default=True)
    enable_on_homepage = models.BooleanField(help_text="Allow this project to be shown on home page.")
    sorting = models.IntegerField(null=True, blank=True,)

   

    thumbnail = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Mandatory, will be shown as all project thumbnails', max_length=250)
    header_image = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Mandatory, will be shown as project header', max_length=250)
    image1 = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Image Will Auto Resize', null=True, blank=True, max_length=250)
    image2 = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Image Will Auto Resize', null=True, blank=True, max_length=250)
    image3 = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Image Will Auto Resize (Field not in use)', null=True, blank=True, max_length=250)
    image4 = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Image Will Auto Resize (Field not in use)', null=True, blank=True, max_length=250)
    image5 = models.ImageField(upload_to = get_project_directory_upload_path, help_text='Image Will Auto Resize (Field not in use)', null=True, blank=True, max_length=250)


    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Project"
        ordering = ['sorting','title']

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.title, instance=self)
        
        imp = custom_function.ImageProcessor()
        if has_changed(self, 'thumbnail' ):
            self.thumbnail = imp.image_resizer(self.thumbnail, self.thumbnail.name, "thumbnail")
        if has_changed(self, 'header_image' ):
            self.header_image = imp.image_resizer(self.header_image, self.header_image.name, "header")
        if has_changed(self, 'image1' ):
            self.image1 = imp.image_resizer(self.image1, self.image1.name, "image")
        if has_changed(self, 'image2' ):
            self.image2 = imp.image_resizer(self.image2, self.image2.name, "image")
        if has_changed(self, 'image3' ):
            self.image3 = imp.image_resizer(self.image3, self.image3.name, "image")
        if has_changed(self, 'image4' ):
            self.image4 = imp.image_resizer(self.image4, self.image4.name, "image")
        if has_changed(self, 'image5' ):
            self.image5 = imp.image_resizer(self.image5, self.image5.name, "image")

        super(Project, self).save(*args, **kwargs)
        

    def __str__(self):
        return self.title

class Project_People(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, )
    people = models.ForeignKey(People, on_delete=models.CASCADE,)
    designation = models.ForeignKey(List_Designation, null=True, blank=True, on_delete=models.SET_NULL, help_text='Designation')
    sorting = models.IntegerField(null=True, blank=True,)
    publish = models.NullBooleanField(default=True)

    class Meta:
        verbose_name = "Project's People"
        verbose_name_plural = "Project's People"
        ordering = ['sorting','people']

    def __str__(self):
        return self.people.name


# Feedback
#-------------------------------------------------------------
class Feedback(models.Model):
    name = models.CharField(max_length=500, null=True, blank=True, help_text="Name")
    compname = models.CharField(max_length=500, null=True, blank=True, help_text="Company Name")
    country_code = models.CharField(max_length=4, null=True, blank=True, help_text="Country Code")
    area_code = models.CharField(max_length=4, null=True, blank=True, help_text="Area Code")
    contact = models.CharField(max_length=255, null=True, blank=True, help_text="Contact Number")
    contact = models.CharField(max_length=255, null=True, blank=True, help_text="Contact Number")
    email = models.CharField(max_length=500, null=True, blank=True, help_text="Contact Email")
    type_enquiry = models.ForeignKey(List_Feedback_Enquiry_Type, null=True, on_delete=models.SET_NULL, help_text="Enquiry Type", related_name='enquiry_type')
    description = HTMLField(null=True, blank=True)
    details_trail = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name
#-------------------------------------------------------------

# Home
#-------------------------------------------------------------
class Page_Header_Image(models.Model):
    title = models.TextField()
    keyword = models.TextField(null=True, blank=True, help_text='Please type manually, not copy from online or MS documents which might cause the text not highlighted on slideshow')
    
    image = models.FileField(upload_to='homepage/', null=True, blank=True)
    project = models.ForeignKey(Project, null=True, blank=True, on_delete=models.CASCADE, help_text="This slide will link to selected project by default.")
    url = models.URLField(null=True, blank=True, help_text="Custom URL address to overide project link, or link to external site.")
    sorting = models.IntegerField()
    publish = models.NullBooleanField(default=True)
    font_hex_color = models.CharField(max_length=10, help_text="Font color in hex, ie: #ffffff. To be displayed for font text overlapping slideshows. Defaulted to white, with black being used for exceptions", default="#ffffff",null=True, blank=True)
    font_shadow_css = models.CharField(max_length=50, help_text="Font shadow css style use for 'text-shadow', ie: '1px 1px 5px #000000'. Optional to display shadow for font text when overlapping with slideshows. Defaulted to Black.", default="1px 1px 5px #000000",null=True, blank=True)
    enable_font_shadow = models.BooleanField()

    class Meta:
        verbose_name = "Page Header Image"
        verbose_name_plural = "Page Header Image"
        ordering = ['sorting','title']

    def __str__(self):
        return self.title

#-------------------------------------------------------------
