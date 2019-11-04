while True:
    cus_name = input("Enter customer name:")
    unit_elec = float(input("Enter units consumed:"))
    surcharge,bill = 0,0

    if 0 <= unit_elec < 200:
        amount_charge = unit_elec * 1.2
        bill = int(amount_charge)
        if amount_charge < 10:
            amount_charge = 10
            bill = amount_charge

    elif 200 <= unit_elec < 400:
        amount_charge = unit_elec * 1.50
        bill = int(amount_charge)

    elif 400 <= unit_elec < 600:
        amount_charge = unit_elec * 1.8
        surcharge = unit_elec * 1.8  * 0.15
        bill = int(unit_elec * 1.8 * 1.15)

    else:
        amount_charge = unit_elec * 2 
        surcharge = unit_elec * 2  * 0.15
        bill = int(unit_elec * 2  * 1.15)

    print("\n")
    print("Customer_Name:" + str(cus_name))
    print("unit Consumed:"+str(unit_elec))
    print('\n')
    print("Amount Charges:"+str(amount_charge))
    print("surcharge amount:"+str(surcharge))
    print("Net Amount Paid by the customer:"+str(bill))