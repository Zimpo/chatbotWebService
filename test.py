import os
import sys
from sys import stdout
import numpy as np
import json
import time

#sys.stdout.write("yolol")
#while(1):
def read_in():
  res = "salut"#sys.stdin.read()
  if (res == "salut"):
    sys.stdout.write("bien le bonjours")
  elif (res == "au revoir"):
    sys.stdout.write("casse toi")
  elif (res == "visa"):
    sys.stdout.write("cambodia")
  elif (res == "quand"):
    sys.stdout.write("jamais")
  else:
    sys.stdout.write("je comprend pas")
  #sys.stdout.write(res)
  sys.stdout.flush()
  time.sleep(1)
  read_in()

read_in()
