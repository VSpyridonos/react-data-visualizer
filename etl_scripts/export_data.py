import sys, csv, os

def export_countries_table(data_path):
    countries_list = []
    for data_file_name in os.listdir(data_path):
        if os.path.isfile(os.path.join(data_path, data_file_name)) and data_file_name.endswith('.csv'):
            with open(os.path.join(data_path, data_file_name), 'r') as f:
                reader =  csv.reader(f)
                next(reader) # skip header of csv file
                for row in reader:
                    if row[0] not in countries_list:
                        countries_list.append(row[0])
    return countries_list

def export_years_table(data_path):
    years_list = []
    for data_file_name in os.listdir(data_path):
        if os.path.isfile(os.path.join(data_path, data_file_name)) and data_file_name.endswith('.csv'):
            with open(os.path.join(data_path, data_file_name), 'r') as f:
                reader =  csv.reader(f)
                for y in next(reader)[1:]:
                    if y not in years_list:
                        years_list.append(y)
    return years_list

def export_measures_table(data_path):
    measures_list = []
    for data_file_name in os.listdir(data_path):
        # Get all the files that end with .csv
        if os.path.isfile(os.path.join(data_path, data_file_name)) and data_file_name.endswith('.csv'):  
            measures_list.append(os.path.splitext(data_file_name)[0])
    return measures_list


def export_data_table(data_path):
    data = [] 
    for data_file_name in os.listdir(data_path):
        if os.path.isfile(os.path.join(data_path, data_file_name)) and data_file_name.endswith('.csv'):
            with open(os.path.join(data_path, data_file_name), 'r') as f:
                reader = csv.reader(f)
                head = next(reader)[1:]
                #print(f'File: {data_file_name}, Head: {head}, Length: {len(head)}')
                for row in reader:
                    country = row[0]
                    for i, m in enumerate(row[1:], start=0):
                        try:
                            data.append([head[i-1], country, m, os.path.splitext(data_file_name)[0]])
                        except IndexError:
                            print(f'Index error at: {i}')
                            sys.exit(2)
    return data

if __name__ == '__main__':
    pass