import os
import sys
from sys import stdout
import numpy as np
import json
import time

while True:
  user = sys.stdin.readline().rstrip('\n')
  if (user == 'salut'):
    print ('Hey what up')
  else:
    print ('sorry')
  sys.stdout.flush()
  time.sleep(1)
