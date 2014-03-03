#! /usr/bin/env python
def getPasswords():
    textFile = open("../../../passwords.txt","r")
    fullText = textFile.readlines()
    textFile.close()
    # print "<br>".join(fullText)

    credDict = {}
    for line in fullText:
        # print line
        if line[0] == "#" or len(line.strip()) < 2: #  skip these lines
            pass
        else:
            key = line.split(":")[0]
            value = line.split(":")[1]
            credDict[key] = value
    return credDict
