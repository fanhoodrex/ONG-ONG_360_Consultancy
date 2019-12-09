import requests,time,json

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

    def append_params(chunk):
        """append the quote currency from the list to the params"""
        n = 0
        nonlocal params
        for item in chunk: # how many times should the loop be
            params["quote_currency_"+str(n)] = item # append the value from the list to the dictionary  
            n += 1 
        return params

    def request_json():
        respone = requests.get(url,headers=header,params=params)
        res_dict = json.loads(respone.text) #convert json string to Python data type
        with open("res_dict1.json","w") as f:
            str_json = json.dumps(res_dict,sort_keys=True,indent=None)
            f.write(str_json)
        return res_dict


    while len(list_quote) > 0:
        chunk = list_quote[:10] # slice the first batch of 10 currency
        params = append_params(chunk) # fill the params with chunk of 10 currency
        res_dict = request_json() # send the request and return json dictionary

        # make the last element of rates in dictionary
        quoteCurrency = [item['quoteCurrency'] for item in res_dict["widget"]] # list comprehension
        average_rate = [item['average'] for item in res_dict["widget"]] # list comprehension
        rates = dict(zip(quoteCurrency,average_rate)) # zip method to turn 2 list into dictionary

        # append the key,value pair to result_dict during each loop 
        for k,v in rates.items():
            result_dict['rates'][k] = v
        list_quote = list_quote[10:] # remove the first batch of 10 currency
        time.sleep(1)

    return result_dict

search_date = "2019-12-04"
base_currency = 'MYR'
list_quote = ['CNY','USD','GBP','SGD','CAD','AUD','EUR','THB','VND','MYR','SAR','LYD'] # more than 10 currencies

result_dict = {'base':base_currency,'date':search_date,'rates':{}} # initialize
result_dict = Crawl_Data(search_date,base_currency,list_quote) # add the rates key/values to result dict

for key,value in result_dict.items():
    print(f"{key}: {value}")
    time.sleep(0.5)
print("\n")
for k,v in result_dict['rates'].items():
    print(f"{k}:{v}")
    time.sleep(1)
