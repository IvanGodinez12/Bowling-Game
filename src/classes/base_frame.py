from .pin import Pin

class BaseFrame:
  def __init__(self, number: int):
    self.bonus_points: int = 0
    self.knock_down_pins: dict[str, list[Pin]] = {
      'first_throw': [],
      'second_throw': [],
    }
    if number == 10:
      self.knock_down_pins['third_throw'] = []
    self.number: int = number
    self.standing_pins: list[Pin] = []
    self.total_score: int = 0

  @property
  def first_throw_score(self) -> int:
    return len(self.knock_down_pins['first_throw'])

  @property
  def frame_score(self) -> int:
    return self.round_score + self.bonus_points

  @property
  def round_score(self) -> int:
    return len(self.knock_down_pins['first_throw']) + len(self.knock_down_pins['second_throw'])

  @property
  def second_throw_score(self) -> int:
    return len(self.knock_down_pins['second_throw'])
