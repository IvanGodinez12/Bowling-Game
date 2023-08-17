import random

class Bowl:
  def __init__(self):
    self.precision = 0

  def throw(self) -> None:
    self.precision = random.randint(0, 101)
