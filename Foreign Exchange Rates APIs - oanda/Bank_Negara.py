import requests,time
from bs4 import BeautifulSoup

url = "http://www.bnm.gov.my/index.php?ch=statistic&pg=stats_exchangerates&lang=en&StartMth=10&StartYr=2019&EndMth=11&EndYr=2019&sess_time=0900&pricetype=Mid&unit=rm"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
}
params = {
    "ch":"statistic",
    "pg":"stats_exchangerates",
    "lang":"en",
    "StartMth":"10",
    "StartYr": "2019",
    "EndMth": "11",
    "EndYr": "2019",
    "sess_time": "0900",
    "pricetype": "Mid",
    "unit": "rm"
}

res = requests.get(url,headers = headers , params=params)

if res.status_code == 200:
    soup = BeautifulSoup(res.text,'html.parser')
    table_rows = soup.find_all('tr')
    
    for tr in table_rows:
        row_list = []
        for td in tr:
            row_list.append(td)
        print(row_list)
        print("{0:-^30}".format("="))
        time.sleep(1)
else:
    print("failed")