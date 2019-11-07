import time

day_list = [i+1 for i in range(7)]

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

day = day_input_eva()

