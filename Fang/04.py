# -*- coding: utf-8 -*-
import time

day_list = list(range(1,8))
enter_count = 1

def day_input_eva():
    "this function is mainly for validating user's input on day chosen "
    global enter_count
    while True:        
        try:
            day = int(input(str(enter_count)+".Enter the day number between 1-7:")) # string
            if day != int and day not in day_list: # condition on type 
                print("input is out of scope,pls enter again")
                time.sleep(1.5)
                enter_count += 1 
                continue
            else:
                enter_count += 1
                break
        except ValueError:
            print("pls enter correct integer format number,enter again")
            time.sleep(1.5)
            enter_count += 1 
            continue
    return day

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
                break
        except ValueError:
            print("ValueError,pls enter correct (Hours:Minutes HH:MM format) format......")
            time.sleep(1.5)
            continue
        except IndexError:
            print("IndexError,pls enter (Hours:Minutes HH:MM format)......")
            time.sleep(1.5)
            continue
    return hour,minute

def week(*args): # enter the how many day are considered as weekday,return as tuple
    "calculate the amount based on the date and hours"
    def inner(fir_hours,fir_charge,sub_charge,min_free,tol_min):
        if 0 <= hour < fir_hours:
            amount = fir_charge
            if hour == 0 and minute <= min_free: #within minutes are free
                amount = 0 
        else:
            # expression amount = 5 + (hour-2)*2 + 2
            amount = fir_charge + (hour-fir_hours) * sub_charge
            if minute > tol_min:
                amount -= sub_charge            
        return amount
    # if the day user enter is on weekday or weekend 
    if day in args:
        print("\nHello Weekday")
        amount = inner(3,3,1,15,5)
        # the order of parameters is fir_hours,fir_charge,sub_charge,min_free,tol_min
        if amount > 20:
            amount = 20.00
    else:
        print("\nHello Weekend")
        amount = inner(2,5,2,15,5)
        # the order of parameters is fir_hours,fir_charge,sub_charge,min_free,tol_min
        if amount > 40:
            amount = 40.00
    return amount

#below is the main function 
while True:
    day = day_input_eva()
    hour,minute = time_input_eva()
    amount = 0.0 #initiative the amount
    amount = week(1,2,3,4,5)
    print(f"Duration: {hour} Hours {minute} Minutes\nNet Amount Needed To Paid: {amount} RM\n")



a = list(range(1,11))
b = ["一","二","三","四","五","六","七"]