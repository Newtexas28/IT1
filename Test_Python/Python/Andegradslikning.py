# -*- coding: utf-8 -*-
"""
Created on Sun Oct 25 13:23:22 2020

@author: Jon Håkon Lia
"""

#Programet skal løyse alle mulige andregrads likningar som er spesifisert
import cmath

def solution(a,b,c):
    d = (b*b - 4*a*c)   
    x1 = (-b+cmath.sqrt(d))/(2*a)
    x2 = (-b-cmath.sqrt(d))/(2*a)
    if d.imag == 0:
        if d.real >= 0:
            type_solution ='Real'
        else:
            type_solution ='Complex'
    else:
        type_solution ='Complex'
    return x1,x2,type_solution

if __name__ == '__main__':
    
    a = complex(input('Skriv koeffisient a: '))
    b = complex(input('Skriv koeffisient b: '))
    c = complex(input('Skriv koeffisient c: '))
    x1,x2,type_solution = solution(a,b,c)
    
    if type_solution == 'Real':
        
        print('Andreregradslikingen har reelle løysingar: ')       
        print('x1= {}'.format(x1.real))
        print('x2= {}'.format(x2.real))
    else:
        print('Andregradslikningen har ingen reelle løysingar: ')
        print('x1= {}'.format(x1))
        print('x2= {}'.format(x2))
    
    
