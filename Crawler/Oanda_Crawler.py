import requests,time,json
from bs4 import BeautifulSoup

url = "https://www1.oanda.com/fx-for-business/historical-rates/api/data/update/"
header = {
    "referer": 'https://www1.oanda.com/fx-for-business/historical-rates',
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    }

while True:
    start_date = input("Enter the date of forex data you wanna search (YYYY-MM-DD Format):")
    params = {
        "source": "OANDA",
        "adjustment":"0",
        "base_currency": input("Enter the base currency:"),
        "start_date": start_date,
        "end_date": start_date,
        "period": "daily",
        "price": "bid",
        "view": "graph",
        "quote_currency_0":input("Enter the quoted currency:")
    }

    respone = requests.get(url,headers=header,params=params)

    if respone.status_code == 200:
        res_dict = json.loads(respone.text) #convert json string to Python data type
        with open("respone_data.json","w") as f:
            str_json = json.dumps(res_dict,sort_keys=True,indent=None)
            f.write(str_json)
    else:
        print("request failed, error:",respone.status_code)
        continue
    
    #get the value from the params dictionary
    date = params["start_date"]
    base_currency = params["base_currency"]
    quote_currency = params["quote_currency_0"]

    average_rate = res_dict["widget"][0]["average"] #get the average_rate

    print(f"{date}: {base_currency} > {quote_currency} = {average_rate}")