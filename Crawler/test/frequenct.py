list_quote = [i+1 for i in range(9)]

frequency = len(list_quote) // 10
remainder = len(list_quote) % 10 
print(frequency,remainder)


frequency_dict = {
    1:[i for i in range(11)],
    2:[i+11 for i in range(10)],
    3:[i+21 for i in range(10)],
} 

{
 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
 2: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
 3: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
}


