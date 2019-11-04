subject_list =[ 'Mathematics','Add Mathematics','Physics','Chemistry','Biology']

while True:
    subject_dict={}
    
    for i in range(len(subject_list)):
        mark = input("pls enter " + subject_list[i] + " marks:")
        subject_dict[subject_list[i]] = mark 
    
    total_science = int(subject_dict['Physics']) + int(subject_dict['Chemistry']) + int(subject_dict['Biology'])
    total_math = int(subject_dict['Mathematics']) + int(subject_dict['Add Mathematics'])
    
    if total_science >= 240 or total_math >= 170:
        print(subject_dict)
        print("The candidate is eligible for admission")
    else:
        print(subject_dict)
        print("The candidate is not eligible for admission")
