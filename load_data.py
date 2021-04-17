import mysql.connector as mySQL

def database_config():
    db_connection = mySQL.connect(
        host = 'localhost',
        user = 'beelg'
    )
    cursor = db_connection.cursor()
    create_tables(cursor)
    create_queries(cursor)

def create_tables(cursor):
    countries_table = """
    CREATE TABLE `countries` (
    `country_id` int NOT NULL AUTO_INCREMENT,
    `country_name` varchar(255) NOT NULL,
    `country_3alpha_code` varchar(255) DEFAULT NULL,
    `country_capital` varchar(255) DEFAULT NULL,
    `country_region` varchar(255) DEFAULT NULL,
    `country_population` varchar(255) DEFAULT NULL,
    `country_flag` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`country_id`),
    UNIQUE KEY `country_name_UNIQUE` (`country_name`)
    ) ENGINE=InnoDB AUTO_INCREMENT=766 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    """

    data_table = """
    CREATE TABLE `data` (
    `data_id` int NOT NULL AUTO_INCREMENT,
    `country_name` varchar(255) NOT NULL,
    `year_name` varchar(255) NOT NULL,
    `measure_name` varchar(255) NOT NULL,
    `measure_value` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`data_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=262142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    """

    measures_table = """
    CREATE TABLE `measures` (
    `measure_id` int NOT NULL AUTO_INCREMENT,
    `measure_name` varchar(255) NOT NULL,
    PRIMARY KEY (`measure_id`),
    UNIQUE KEY `measure_name_UNIQUE` (`measure_name`)
    ) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    """

    years_table = """
    CREATE TABLE `years` (
    `year_id` int NOT NULL AUTO_INCREMENT,
    `year_name` varchar(255) NOT NULL,
    PRIMARY KEY (`year_id`),
    UNIQUE KEY `year_name_UNIQUE` (`year_name`)
    ) ENGINE=InnoDB AUTO_INCREMENT=2045 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    """

    cursor.execute(countries_table)
    cursor.execute(data_table)
    cursor.execute(measures_table)
    cursor.execute(years_table)

def create_queries(cursor):

    measures_table_query = """
    LOAD DATA INFILE 'measures.csv' 
    INTO TABLE test_viz_db.measures
    FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    (measure_name);
    """

    years_table_query = """
    LOAD DATA INFILE 'years.csv' 
    INTO TABLE test_viz_db.years
    FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    (year_name);
    """

    countries_table_query = """
    LOAD DATA INFILE 'countries.csv' 
    INTO TABLE test_viz_db.countries
    FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    (country_name, country_3alpha_code, country_capital, country_region, country_population, country_flag);
    """

    data_table_query = """
    LOAD DATA INFILE 'data.csv' 
    INTO TABLE test_viz_db.data
    FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    (year_name, country_name, measure_value, measure_name);
    """

    cursor.execute(measures_table_query)
    cursor.execute(years_table_query)
    cursor.execute(countries_table_query)
    cursor.execute(data_table_query)


if __name__ == '__main__':
    database_config()