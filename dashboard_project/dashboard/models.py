from django.db import models


class DataPoint(models.Model):
    end_year = models.CharField(max_length=10, blank=True, null=True)
    intensity = models.IntegerField(blank=True, null=True)
    sector = models.CharField(max_length=100, blank=True, null=True)
    topic = models.CharField(max_length=100, blank=True, null=True)
    insight = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    start_year = models.CharField(max_length=10, blank=True, null=True)
    impact = models.TextField(blank=True, null=True)
    added = models.CharField(max_length=50, blank=True, null=True)
    published = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    relevance = models.IntegerField(blank=True, null=True)
    pestle = models.CharField(max_length=100, blank=True, null=True)
    source = models.CharField(max_length=100, blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    likelihood = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.country} - {self.city} ({self.year})"


"""class DataPoint(models.Model):
    intensity = models.FloatField()
    likelihood = models.FloatField()
    relevance = models.FloatField()
    year = models.IntegerField()
    country = models.CharField(max_length=100)
    topics = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    end_year = models.IntegerField()
    sector = models.CharField(max_length=100)
    pestle = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    swot = models.CharField(max_length=100)"""
