# -*- coding: utf-8 -*-
"""
Created on Wed Nov 13 17:41:12 2019

@author: jfang
"""

fir_charge = 3
fir_hours = 3 
sub_min = 30
sub_charge = 1
tol_min = 5

def time_input_eva():
    "this function is mainly for validating user's input on duration chosen"
    while True:
        try:
            duration = input("Enter the Duration:")
            hour = int(duration.split(":")[0]) # slice out the hour part
            minute = int(duration.split(":")[1]) # slice out the minute part
            if type(hour) != int or type(minute) != int : # condition on type 
                print("pls enter correct (Hours:Minutes HH:MM format) format.....")
                time.sleep(1.5)
                continue
            else:
                # in case if user enter minute value > 60 
                if (minute//60) != 0: 
                    hour += (minute//60) # add to hour 
                    minute %= 60 # reduce the minute
                total_minutes = hour * 60 + minute # conver the HH:MM format to minutes
                break
        except (IndexError,ValueError):
            print("pls enter correct (Hours:Minutes HH:MM format) format......")
            time.sleep(1.5)
            continue
    return hour,minute,total_minutes

while True:
    hour,minute,total_minutes = time_input_eva()    
    amount = fir_charge + (total_minutes - fir_hours * 60) // sub_min * sub_charge
    if minute > tol_min:
        amount += sub_charge
    print("\n")
    print("Total minutes is:",total_minutes)
    print(f"{fir_charge} + ({total_minutes}- {fir_hours}* 60) // {sub_min} * {sub_charge}")
    print(f"Net Amount Needed To Paid: {amount} RM\n")

"""
based on the testing 

how to change the code to make 30 // 30 = 0 while 29 // 30 = 0 mathemathically