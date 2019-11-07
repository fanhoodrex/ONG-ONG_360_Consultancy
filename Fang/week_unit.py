while True:
    day = int(input("what day is it?:"))

    duration = input("Enter the Duration:")
    hour = int(duration.split(":")[0]) # slice out the hour part
    minute = int(duration.split(":")[1]) # slice out the minute part

    # days = input("what days are considered as weekdays?:")
    def week(*args): # enter the how many day are considered as weekday,return as tuple
        "calculate the amount based on the date and hours"
        def inner(fir_hours,fir_charge,sub_charge,min_free,tol_min):
            if hour == 0:
                if minute <= min_free: #within minutes are free
                    amount = 0 
                else:
                    amount = fir_charge
            elif 0 < hour < fir_hours:
                amount = fir_charge
            else:
                if minute <= tol_min: #Exit Within 5 minutes are free
                    amount = hour
                else:
                    amount = hour + sub_charge
            return amount

        if day in args:
            print("Hello Weekday")
            amount = inner(3,3,1,15,5)
        else:
            print("Hello Weekend")
            amount = inner(2,5,2,15,5)
        return amount

    amount = week(1,2,3,4,5)
    print(amount)
"""     
fir_hours = float(input("how long is the first hours:"))
fir_charge = float(input("How much is the first charge?:"))
sub_charge = float(input("How much is the subsequent charge?:"))
max_charge = float(input("what is the max charge?:"))
min_free = float(input("Enter within how many minutes are free?:"))
tol_min = float(input("How long is the minutes toleration?:"))
"""