#!/usr/bin/env python
import smtplib
from getPasswords import getPasswords
def sendMail(subject,text):
    message = 'Subject: %s\n\n%s' % (subject, text)
    username = 'dan123911@gmail.com'  
    password = getPasswords()["emailPassword"]
      
    # The actual mail send  
    server = smtplib.SMTP('smtp.gmail.com:587')  
    server.starttls()
    server.login(username,password)
    server.sendmail(username, username, message)  
    server.quit()

if __name__ == '__main__':
    sendMail("this","that")