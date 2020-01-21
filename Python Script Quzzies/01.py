student= {
    'David':80,
    'Paul':47,
    'Daniel':68,
    'Thomas':95
}
sum_all = 0
def cal_avg(stu_array):
    for value in stu_array.values():
        global sum_all
        sum_all += value
    average = sum_all / len(stu_array)
    return "the average marks of students is:"+ str(average)
stu_avg = cal_avg(student)
print(stu_avg)

while True:
    stu_grade = int(input("Enter student grade:"))
    if 80 < stu_grade <= 100:
        print("A")

    elif 60 < stu_grade <= 80:
        print("B")

    elif 50 < stu_grade <= 60:
        print('C')
    else:
        print('F')