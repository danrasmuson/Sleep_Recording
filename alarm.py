#!/usr/bin/env python
print "Content-Type: text/html" 
print 

from sendEmail import sendMail

sendMail("alarm Sleep_Recording","")
print "<h1>alarm Email Successfully Sent</h1>"