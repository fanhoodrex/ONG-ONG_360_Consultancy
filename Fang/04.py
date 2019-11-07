# -*- coding: utf-8 -*-
"""
Created on Fri Nov  1 12:37:02 2019

@author: Zac_Fang
"""
import time

day_list = list(range(1,8))

def day_input_eva():
    while True:        
        try:
            day = int(input("Enter the day number between 1-7:")) # string
            if day != int and day not in day_list: # condition on type 
                print("input is out of day_list scope")
                time.sleep(1.5)
                continue
            else:
                break
        except ValueError:
            print("pls enter correct integer number")
            time.sleep(1.5)
            continue
    return day

def time_input_eva():
    while True:
        try:
            duration = input("Enter the Duration:")
            hour = int(duration.split(":")[0]) # slice out the hour part
            minute = int(duration.split(":")[1]) # slice out the minute part
            if type(hour) != int or type(minute) != int : # condition on type 
                print("pls enter correct format.....")
                time.sleep(1.5)
                continue
            else:
                break
        except ValueError:
            print("ValueError,pls enter correct integer format......")
            time.sleep(1.5)
            continue
        except IndexError:
            print("IndexError,pls enter (Hours:Minutes HH:MM format)......")
            time.sleep(1.5)
            continue
    return hour,minute

def weekday(): 
    """calcualte the price based on duration"""
    if hour == 0:
        if minute <= 10:
            amount = 0 #Exit Within 5 minutes are free
        else:
            amount = 3
    elif 0 < hour < 3:
        amount = 3
    else:
        if minute <= 5:
            amount = hour
        else:
            amount = hour + 1.5
    return amount

def weekend(): 
    """calcualte the price based on duration"""
    if hour == 0:
        if minute <= 10:
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




