from .pin import Pin
from .base_frame import BaseFrame

class ExtraFrame(BaseFrame):
  def __init__(self, number: int):
    super().__init__(self, number)
    self.bonus_points: int = 0
    self.knock_down_pins: dict[str, list[Pin]] = {
      'first_throw': [],
      'second_throw': [],
      'third_throw': [],
    }
    self.number: int = number
    self.standing_pins: list[Pin] = []
    self.total_score: int = 0

  @property
  def round_score(self) -> int:
    return len(self.knock_down_pins['first_throw']) + len(self.knock_down_pins['second_throw']) + len(self.knock_down_pins['third_throw'])

  @property
  def spares(self) -> dict[str, list[bool]]:
    return {
      'first_pair_throw': len(self.knock_down_pins['first_throw']) + len(self.knock_down_pins['second_throw']) == 10,
      'second_pair_throw': len(self.knock_down_pins['second_throw']) + len(self.knock_down_pins['third_throw']) == 10,
    }

  @property
  def strikes(self) -> dict[str, list[bool]]:
    return {
      'first_throw': len(self.knock_down_pins['first_throw']) == 10,
      'second_throw': len(self.knock_down_pins['second_throw']) == 10,
      'third_throw': len(self.knock_down_pins['third_throw']) == 10,
    }

  @property
  def third_throw_score(self) -> int:
    return len(self.knock_down_pins['third_throw'])
