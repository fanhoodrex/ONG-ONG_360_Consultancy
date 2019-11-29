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

key_list = list(params.keys()) # get the keys list first
currency_index = key_list.index("quote_currency_0") # get the index in the list
keyname = key_list[currency_index][-1] # get the last number in string
print(keyname)