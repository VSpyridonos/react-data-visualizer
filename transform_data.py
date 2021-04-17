#################################################################
######## Scripts to export the data from the data files #########
#################################################################
from export_data import *
import time
import requests

global output_path
output_path = 'C:\ProgramData\MySQL\MySQL Server 8.0\Data\\test_viz_db'

def transform_years(years_list):
    with open(f'{output_path}/years.csv', 'w') as yf:
        for year in years_list:
            yf.write(f'{year}\n')

def transform_measures(measures_list):
    with open(f'{output_path}/measures.csv', 'w') as mf:
        for measure in measures_list:
            mf.write(f'{measure}\n')

call = 0
def find_countries_info(country_name):
    """
    Calls the restcountries.eu api for the given country
    Params: `country_name` 
    `Returns:` a dictionary with the countries info
    """
    global call
    info_dict = {}
    r = requests.get(f'https://restcountries.eu/rest/v2/name/{country_name}')
    if r.status_code == 200:
        json_data = r.json()
        # The api at restcountries.eu provides a lot of info. We picked the ones below
        for field in json_data:
            for key, value in field.items():
                if key not in info_dict:
                    if key == 'alpha3Code':
                        info_dict['alpha3Code'] = value
                    if key == 'capital':
                        info_dict['capital'] = value
                    if key == 'region':
                        info_dict['region'] = value
                    if key =='population':
                        info_dict['population'] = value
                    if key == 'flag':
                        info_dict['flag'] = value
    
    if not info_dict:
        print(f"No data at line: {call}")
    call += 1
    return info_dict

def transform_countries(countries_list):
    with open(f'{output_path}/countries.csv', 'w', encoding="utf-8") as cf:
        countries_info = []
        for country in countries_list:
            if ', Fed. Sts.' in country:
                country = country.replace(', Fed. Sts.', '')
            elif 'St.' in country:
                country = country.replace('St.', 'Saint')
            elif 'St' in country and country != 'United States':
                country = country.replace('St', 'Saint')
            elif country == 'Cape Verde':
                country = country.replace('Cape', 'Cabo')
            elif country == 'Congo, Dem. Rep.':
                country = 'Congo (Democratic Republic of the)'
            elif country == 'Congo, Rep.':
                country = 'Congo'
            elif country == 'North Korea':
                country = "Korea (Democratic People's Republic of)"
            elif country == 'North Macedonia':
                country = 'Macedonia'
            elif country == 'South Korea':
                country = 'Korea (Republic of)'

            country_info = find_countries_info(country)
            countries_info.append(country_info)
            info_to_write = "\t".join(f"{value}" for key, value in country_info.items())
            cf.write(f"{country}\t {info_to_write}\n")

def transform_data(data_list):
    with open(f'{output_path}/data.csv', 'w') as df:
        for data in data_list:
            for d in data:
                if d == '':
                    df.write('None')
                if d == data[-1]: df.write(f'{d}')
                else: df.write(f'{d}\t')
            df.write(f'\n')

if __name__ == '__main__':

    data_path = '../data/'

    print('Exporting and transforming countries table...⏳')
    start_time = time.time()
    transform_countries(export_countries_table(data_path))
    end_time = time.time()
    print(f'⌛Total time: {end_time-start_time} seconds😲!')
    print('-----------------------------------------------')
    print('Exporting and transforming years table...⏳')
    start_time = time.time()
    transform_years(export_years_table(data_path))
    end_time = time.time()
    print(f'⌛Total time: {end_time-start_time} seconds😲!')
    print('-----------------------------------------------')
    print('Exporting and transforming measures table...⏳')
    start_time = time.time()
    transform_measures(export_measures_table(data_path))
    end_time = time.time()
    print(f'⌛Total time: {end_time-start_time} seconds😲!')
    print('-----------------------------------------------')
    print('Exporting and transforming data table...⏳')
    start_time = time.time()
    transform_data(export_data_table(data_path))
    end_time = time.time()
    print(f'⌛Total time: {end_time-start_time} seconds😲!')
