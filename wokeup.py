#!/usr/bin/env python
print "Content-Type: text/html" 
print 

from sendEmail import sendMail

sendMail("wokeup Sleep_Recording","")
print "<h1>wokeup Email Successfully Sent</h1>"