import sys
rules = [
  {
    'title' : 'Weekday', 'day' : [1,2,3,4,5],
    'fix_rate' : [{'minute':180,'amount':3}],
    'subsequent_rate' : {'minute':60, 'amount':1},
    'max_cap_rate' : 20, 'tolerate' : 5, 'free_minute' : 15,
  },
  {
    'title' : 'Weekend', 'day' : [6,7],
    'fix_rate' : [{'minute':120,'amount':5}],
    'subsequent_rate' : {'minute':60, 'amount':2},
    'max_cap_rate' : 40, 'tolerate' : 5, 'free_minute' : 15,
  }
]

def calculate_amount(minute, rule):
  try:
    amount = 0.0
    if minute > rule['free_minute']:
      minute = minute - rule['tolerate']
      if minute > 0:
        for item in rule['fix_rate']:
          if minute > 0:
            minute -= item['minute']
            amount += item['amount']
        
        while minute > 0:
          minute -= rule['subsequent_rate']['minute']
          amount += rule['subsequent_rate']['amount']

        if amount > rule['max_cap_rate']:
          amount = rule['max_cap_rate']
    return amount
  except:
    pass
    print(sys.exc_info())

while True:
  try:
    print("=============================")
    day = int(input("Enter the day:"))
    duration = input("Enter the Duration:").split(":")
    if len(duration) != 2:
      raise Exception('Invalid time format')
    minute = int(duration[0]) * 60 + int(duration[1])    
    amount = 0

    day_count = 0
    while minute > 0:
      for rule in rules:
        if day+day_count in rule['day']:
          amount += calculate_amount(1440 if minute > 1440 else minute, rule)
          break
      minute -= 1440
      day_count += 1

    print(f"Net Amount Needed To Paid: RM {amount} ",end="\n")
  except:
    #print(sys.exc_info())
    print('==================\nError! Try Again\n==================\n')