#!/usr/bin/env python
print "Content-Type: text/html" 
print 

from sendEmail import sendMail

sendMail("leftHosue Sleep_Recording","")
print "<h1>leftHosue Email Successfully Sent</h1>"