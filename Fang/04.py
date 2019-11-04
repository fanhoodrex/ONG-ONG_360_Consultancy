# -*- coding: utf-8 -*-
"""
Created on Fri Nov  1 12:37:02 2019

@author: Zac_Fang
"""
day_list = [i+1 for i in range(7)]

day = int(input("Enter the day:"))
duration = input("Enter the Duration:")

hour = int(duration.split(":")[0])
minute = int(duration.split(":")[1])
amount = 0

def weekday(): 
    if hour == 0 and minute < 15:
        amount = 0
    elif 0 < hour <= 3:
        amount = 3
    else:
        amount = hour
    return amount

def weekend(): #根据时间算出价格
    if hour == 0 and minute < 15:
        amount = 0
    elif 0 < hour <= 2:
        amount = 5
    else:
        amount = 5 + 2*(hour - 2)
    return amount

if day in day_list[:5]:
    amount = weekday()
    if amount > 20:
        amount = 20
    print(f"Duration: {hour} Hours {minute} Minutes \n Net Amount Needed To Paid: {amount}")

elif day in day_list[5:]:
    amount = weekend()
    if amount > 40:
        amount = 40
    print(f"Duration: {hour} Hours {minute} Minutes \n Net Amount Needed To Paid: {amount}")