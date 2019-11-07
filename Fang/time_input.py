import time
hour,minute = 0,0

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

hour,minute = time_input_eva()

