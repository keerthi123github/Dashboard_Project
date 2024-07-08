import os
import json
from django.core.management.base import BaseCommand
from dashboard.models import DataPoint

class Command(BaseCommand):
    help = 'Load data from jsondata.json'

    def handle(self, *args, **kwargs):
        file_path = os.path.join('dashboard', 'data', 'jsondata.json')
        with open(file_path, 'r') as file:
            data = json.load(file)
            for index, item in enumerate(data):
                try:
                    DataPoint.objects.create(
                        end_year=item.get('end_year', ''),
                        intensity=self.safe_int(item, 'intensity', 0),
                        sector=item.get('sector', ''),
                        topic=item.get('topic', ''),
                        insight=item.get('insight', ''),
                        url=item.get('url', ''),
                        region=item.get('region', ''),
                        start_year=item.get('start_year', ''),
                        impact=item.get('impact', ''),
                        added=item.get('added', ''),
                        published=item.get('published', ''),
                        country=item.get('country', ''),
                        relevance=self.safe_int(item, 'relevance', 0),
                        pestle=item.get('pestle', ''),
                        source=item.get('source', ''),
                        title=item.get('title', ''),
                        likelihood=self.safe_int(item, 'likelihood', 0)
                    )
                except KeyError as e:
                    self.stdout.write('Missing key {} in item {}: {}'.format(e, index, item))
                except ValueError as e:
                    self.stdout.write('Invalid value for {} in item {}: {}'.format(e, index, item))

        self.stdout.write('Data loaded successfully')

    def safe_int(self, item, key, default):
        value = item.get(key, '')
        if value == '':
            return default
        try:
            return int(value)
        except ValueError:
            raise ValueError('Invalid value for {}'.format(key))
