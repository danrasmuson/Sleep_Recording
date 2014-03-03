#!/usr/bin/env python
print "Content-Type: text/html" 
print 

from sendEmail import sendMail

sendMail("toSleep Sleep_Recording","")
print "<h1>toSleep Email Successfully Sent</h1>"