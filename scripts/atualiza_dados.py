#!/usr/bin/env python3

import io
import os
import time

import geopy
import requests
import rows
import rows.utils


CSV_URL = 'https://docs.google.com/spreadsheets/d/1L0fCMwxUzOZ3xKT1yk9Rch6yKKBGdkcXRqDMBGx89ok/export?format=csv'
ROOT_PATH = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
JSON_PATH = os.path.join(ROOT_PATH, 'data/feiras-organicas-curitiba.json')

start_time = time.time()
print('Downloading data from Google Docs...', end='', flush=True)
response = requests.get(CSV_URL)
print(' done.')

content = response.content
encoding = rows.utils.detect_local_source('data.csv', content).encoding
table = rows.import_from_csv(io.BytesIO(content), encoding=encoding)

geocoder = geopy.geocoders.GoogleV3(domain='maps.google.com.br', timeout=3)
data = []
for row in table:
    row = row._asdict()
    print('Resolving {}...'.format(row['endereco']), end='', flush=True)
    location = geocoder.geocode(row['endereco'])
    print(' done.')
    row['latitude'], row['longitude'] = location.latitude, location.longitude
    data.append(row)

print('Exporting data (total: {})...'.format(len(data)), end='', flush=True)
final = rows.import_from_dicts(data)
rows.export_to_json(final, JSON_PATH)
print(' done.')

end_time = time.time()
print('Finished in {:5.3f} seconds.'.format(end_time - start_time))
