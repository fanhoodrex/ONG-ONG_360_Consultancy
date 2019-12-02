enter_count = 1
1111-01-01 10 digits
1111-1-1 8 digits

def date_input_eva():   
        try:
            date = input("Enter the date in YYYY-MM-DD format:") # string
            date_list = date.split('-')
            if date # condition on 
                print("input is out of scope,pls enter again")
                time.sleep(1.5)
                enter_count += 1 
                continue
            else:
                enter_count += 1
                break
        except Exception:
            print("pls enter correct format again")
            time.sleep(1)
            enter_count += 1 
            continue
    return day

def currency_input_eva():
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