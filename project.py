import sqlite3
conn = sqlite3.connect('customer_data.db')
c = conn.cursor()
"""
Creating Database
"""
c.execute("""CREATE TABLE dbms (        
            customer text,
            shop text,
            pay integer
            )""")
def insert_cus(cus,shop,pay):
    with conn:
        c.execute("INSERT INTO dbms VALUES (:customer, :shop, :pay)", {'customer': cus, 'shop': shop, 'pay': pay})


def find(cus,no):
    if no==1:
        c.execute("SELECT shop,pay FROM dbms WHERE customer=:customer", {'customer': cus})
        return c.fetchall()
    elif no==0:
        c.execute("SELECT customer,pay FROM dbms WHERE shop =:shop", {'shop': cus})
        return c.fetchall()
    elif no==2:
        c.execute("SELECT customer,pay FROM dbms WHERE shop =:shop and customer = :customer", {'shop': cus,'customer': cus})
        return c.fetchall()

def update_pay(cust,shop, pay):
    try:
     with conn:
        c.execute("""UPDATE dbms SET pay = :pay
                    WHERE  customer= :customer, shop=:shop """,
                  {'customer': cust, 'pay': pay,'shop':shop })
    except:
        print("Not Found ")


def remove_cust(cust,shop):
    try:
      with conn:
          c.execute("DELETE from dbms WHERE customer = :customer and shop = :shop ",
                    {'customer': cust, 'shop': shop})
          print("Deleted:", cust)
    except:
        print("Not Found ")

def customerside(name):

    detail = find(name,1)
    print("Payment="+str(len(detail)))
    print("shop \t\t\t Pay")
    for i in range(len(detail)):
        print(str(detail[i][0])+'\t\t\t'+str(detail[i][1]))
    conn.commit()


def shopside(shop):
    ans=input("Do you want to 1)see your credit list\n2)Update any payment? ")
    if ans==1:
        detail = find(shop, 0)
        print("Payment=" + str(len(detail)))
        print("Person \t\t\t Pay")
        for i in range(len(detail)):
            print(str(detail[i][0]) + '\t\t\t' + str(detail[i][1]))

    elif ans==2:
        name=input("Enter your Customer Name:")
        pay=input("Amount he has to pay")
        detail = update_pay(name,shop,pay)
        print("Payment=" + str(len(detail)))


def admin(name,shop,no):
    if no==1:
        insert_cus(name,shop,pay=0)
    elif no==0:
        remove_cust(name, shop)


user=input("Enter your youser name:\t")
passw=input("Enter your password:\t")
if find(user,1):
    if user==passw:
        customerside(user)
    else:
        print("Incorrect password")
elif find(user,0):
    if user == passw[::-1]:
        shopside(user)
    else:
        print("Incorrect password")

else:
    a=input("Create a account as Customer ?(Y/N)\n ")
    if a=='y' or 'Y':
       name = input("Enter your Name:")
       shop = input("Enter the Shop Name:")
       insert_cus(name,"shop ","0")
    else:
        print("Contact Admin")
