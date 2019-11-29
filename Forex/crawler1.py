import requests,time,json
from bs4 import BeautifulSoup

url = "https://www1.oanda.com/fx-for-business/historical-rates/api/data/update/"

"""
start_date = input("Enter the start date:")
end_date = input("Enter the end date:")
base_currency = input("Enter the base_currency: ")
quote_currency_0 = input("Enter the quote_currency_0")
quote_currency_1 = input("Enter the quote_currency_1")
"""

params = {
    "source": "OANDA",
    "adjustment":"0",
    "base_currency": "USD",
    "start_date": "2019-11-27",
    "end_date": "2019-11-29",
    "period": "daily",
    "price": "bid",
    "view": "graph",
    "quote_currency_0":"MYR",
    "quote_currency_1":"CNY",
    "quote_currency_2":None,
    "quote_currency_3":None,
    "quote_currency_4":None,
    "quote_currency_5":None,
    "quote_currency_6":None,
    "quote_currency_7":None,
    "quote_currency_8":None,
    "quote_currency_9":None
}

header = {
     "referer": 'https://www1.oanda.com/fx-for-business/historical-rates',
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    }
respone = requests.get(url,headers=header,params=params)

if respone.status_code == 200:
    print("request is successful")
    time.sleep(1)
    res_dict = json.loads(respone.text)#convert json string to Python data type
else:
    print("error",respone.status_code)

time.sleep(2)
print("\n\n")


with open("JSON1.json","w") as f:
    str_json = json.dumps(res_dict,sort_keys=True,indent=None)
    f.write(str_json)

date = params["start_date"]
base_currency = params["base_currency"]


average_rate = res_dict["widget"][0]["data"][0][-1] #=get the average_rate

print(date,base_currency,average_rate)

