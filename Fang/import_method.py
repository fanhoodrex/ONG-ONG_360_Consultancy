import time
from day_input import day_input_eva
from time_input import time_input_eva

day_list = [i+1 for i in range(7)]

def weekday(): 
    """calcualte the price based on duration"""
    if hour == 0:
        if minute <= 15:
            amount = 0 #Exit Within 5 minutes are free
        else:
            amount = 3
    elif 0 < hour < 3:
        amount = 3
    else:
        if minute <= 5:
            amount = hour
        else:
            amount = hour + 1
    return amount

def weekend(): 
    """calcualte the price based on duration"""
    if hour == 0:
        if minute <= 15:
            amount = 0 #Exit Within 5 minutes are free
        else:
            amount = 5
    elif 0 < hour < 2:
        amount = 5
    else:
        if minute <= 5:
            amount = 5 + (hour - 2) * 2
            # expression equals to amount = 2 hour + 1         
        else:
            amount = 5 + (hour - 2) * 2 + 2
            # expression equals to amount =  2 * hour + 3 
    return amount

while True:
    day = day_input_eva()
    hour,minute = time_input_eva()
    amount = 0.0 #initiative the amount

    if day in day_list[:5]:
        amount = weekday()
        if amount > 20:
            amount = 20.00
        print(f"Duration: {hour} Hours {minute} Minutes\nNet Amount Needed To Paid: {amount} RM",end="\n")

    elif day in day_list[5:]:
        amount = weekend()
        if amount > 40:
            amount = 40.00
        print(f"Duration: {hour} Hours {minute} Minutes\nNet Amount Needed To Paid: {amount} RM",end="\n")




