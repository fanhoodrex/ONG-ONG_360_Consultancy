import time
# define the price dictionary for each different day
# [ first 3 hour , RM3, Subsequent hour 1 , Exit 15 mins are free , Tolerate 5 min,Max charge RM]
price_dict = {
    1:[3,3,60,1,15,5,20],
    2:[3,3,60,1,15,5,20],
    3:[3,3,30,1,15,5,20], # requirement change as first 3 hour cost 0 RM 
    4:[3,3,60,1,15,5,20],
    5:[3,3,60,1,15,5,20],
    6:[2,5,120,2,15,5,40],
    7:[2,5,120,2,15,5,40],
}

def day_input_eva():
    "this function is mainly for validating user's input on day chosen "
    day_list = list(range(1,8))
    enter_count = 1
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
                total_minutes = hour * 60 + minute # conver the HH:MM format to minutes
                break
        except (IndexError,ValueError):
            print("pls enter correct (Hours:Minutes HH:MM format) format......")
            time.sleep(1.5)
            continue
    return hour,minute,total_minutes

def week(): # enter the how many day are considered as weekday,return as tuple
    "outer function that return the amount value"
    def inner(day):
        """inner function that calculate the amount based on the date and hours"""
        fir_hours = price_dict[day][0] #get the first hour amount from dictionary
        fir_charge = price_dict[day][1] #get the first charge amount from dictionary
        sub_min = price_dict[day][2]
        sub_charge = price_dict[day][3] #get the subsequent charge amount from dictionary
        min_free = price_dict[day][4] #get the minimum minutes free from dictionary
        tol_min = price_dict[day][5] #get the tolerate minutes from dictionary

        # between the 0 hour and first 3 hour
        if 0 <= hour < fir_hours:
            amount = fir_charge
            if hour == 0 and minute <= min_free: #within minutes are free
                amount = 0 
        else:
            # expression amount = 5 + (hour-2)*2 + 2
            amount = fir_charge + (total_minutes - fir_hours * 60) // sub_min * sub_charge
            # 3 +( (186 - 3 * 60 ) // 60 )* 1
            if minute > tol_min:
                amount += sub_charge            
        return amount

    amount = inner(day)
    # the order of parameters is fir_hours,fir_charge,sub_charge,min_free,tol_min
    if amount > max_charge:
        amount = max_charge
    return amount
    
#below is the main function 
if __name__ == "__main__":
    while True:
        day = day_input_eva()
        max_charge = price_dict[day][-1] # get the maximum charge from the price dictionary
        hour,minute,total_minutes = time_input_eva()
        amount = week()
        print(f"Duration: {hour} Hours {minute} Minutes\nNet Amount Needed To Paid: {amount} RM\n")

"""-----------------------------------------------------------"""

"""
#1: sub_min:60  test input: 03:06
amount = fir_charge + (hour - fir_hours) * sub_charge
# 3 + (3 - 3) * 1
amount = fir_charge + (total_minutes - fir_hours * 60) // sub_min * sub_charge
# 3 + (186 - 180) // 60 * 1

#2: sub_min:30 test input :03:36
amount = fir_charge + (hour - fir_hours) * sub_charge
# 3 + (3 - 3) * 1
amount = fir_charge + (total_minutes - fir_hours * 60) // sub_min * sub_charge
# 3 + ( (216 - 3 * 60) // 30 ) * 1 
"""