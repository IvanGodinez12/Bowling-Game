from .pin import Pin
from .base_frame import BaseFrame

class Frame(BaseFrame):

  def __init__(self, number: int):
    super().__init__(self, number)
    self.bonus_points: int = 0
    self.knock_down_pins: dict[str, list[Pin]] = {
      'first_throw': [],
      'second_throw': [],
    }
    self.number: int = number
    self.standing_pins: list[Pin] = []
    self.total_score: int = 0

  @property
  def spare(self) -> bool:
    if (self.strike):
      return False
    elif (len(self.knocked_down_pins['first_throw']) + len(self.knock_down_pins['second_throw']) == 10):
      return True
    else:
      return False

  @property
  def strike(self) -> bool:
    if (len(self.knocked_down_pins['first_throw']) == 10):
      return True
    else:
      return False
