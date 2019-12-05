import requests,time,json
from operator import itemgetter

def Crawl_Data(date,base_currency,list_quote):
    """get the responing json data and return the required dictionary from json """

    url = "https://www1.oanda.com/fx-for-business/historical-rates/api/data/update/"
    header = {
        "referer": 'https://www1.oanda.com/fx-for-business/historical-rates',
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        }
    params = {
        "source": "OANDA",
        "adjustment":"0",
        "base_currency":base_currency,
        "start_date": date,
        "end_date": date,
        "period": "daily",
        "price": "bid",
        "view": "graph",
        "quote_currency_0":None,
        "quote_currency_1":None,
        "quote_currency_2":None,
        "quote_currency_3":None,
        "quote_currency_4":None,
        "quote_currency_5":None,
        "quote_currency_6":None,
        "quote_currency_7":None,
        "quote_currency_8":None,
        "quote_currency_9":None
    }

    def append_dict():
        """append the value from the list to the params"""
        n = 0
        nonlocal params
        for item in list_quote: # how many times should the loop be
            params["quote_currency_"+str(n)] = item # append the value from the list to the dictionary  
            n += 1 
        return params

    try:
        if len(list_quote) <= 10: # if the quote_currencies is larger or equal to 10 
            params = append_dict() # reassign the params by calling function
            respone = requests.get(url,headers=header,params=params)
            res_dict = json.loads(respone.text) #convert json string to Python data type
            with open("respone_dict_json.json","w") as f:
                str_json = json.dumps(res_dict,sort_keys=True,indent=None)
                f.write(str_json)
        # list comprehension  
        quoteCurrency = [sub['quoteCurrency'] for sub in res_dict["widget"]]
        average_rate = [sub['average'] for sub in res_dict["widget"]]
        result_dict = {'date':date,'base':base_currency,}
        rate = dict(zip(quoteCurrency,average_rate)) # use zip method to turn 2 list into dictionary
        result_dict["rate"] = rate
        return result_dict

    except Exception:
        print("request failed, error:",respone.status_code)

date = "2019-12-04"
base_currency = 'MYR'
list_quote = ['CNY','USD','GBP','SGD']

result_dict = Crawl_Data(date,base_currency,list_quote)
print(result_dict)