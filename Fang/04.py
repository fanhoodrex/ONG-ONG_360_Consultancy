# -*- coding: utf-8 -*-
"""
Created on Fri Nov  1 12:37:02 2019

@author: Zac_Fang
"""
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
            amount = 5
        else:
            amount = 3 + 2*hour  
    return amount

while True:
    day = float(input("Enter the day:"))
    duration = input("Enter the Duration:")

    hour = int(duration.split(":")[0]) # slice out the hour part
    minute = int(duration.split(":")[1]) # slice out the minute part 
    amount = 0.0 #initiative 
    
    if day in day_list[:5]:
        amount = weekday()
        if amount > 20:
            amount = 20.00
        print(f"\nDuration: {hour} Hours {minute} Minutes\nNet Amount Needed To Paid: {amount} RM")

    elif day in day_list[5:]:
        amount = weekend()
        if amount > 40:
            amount = 40.00
        print(f"\nDuration: {hour} Hours {minute} Minutes\nNet Amount Needed To Paid: {amount} RM")
        