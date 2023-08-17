import random
from .bowl import Bowl
from .extra_frame import ExtraFrame
from .frame import Frame
from .pin import Pin

class Game:
  def __init__(self):
    self.final_score: int = 0
    self.frames: list[int] = []
    self.pins: list[Pin] = []
    self.start()

  def set_up_pins(self) -> None:
    for i in range(0, 10):
      self.pins.append(Pin(i))

  def launch(self) -> None:
    bowl = Bowl()
    bowl.throw()
    for pin in self.pins:
      if (pin.is_standing and bowl.precision >= random.randint(0, 101)):
        pin.knock_down()

  def round(self, number: int) -> Frame:
    frame = Frame(number)
    self.launch()
    frame.knocked_down_pins['first_throw'] = list(filter(lambda pin: not pin.is_standing, self.pins))
    if (any(pin.is_standing for pin in self.pins)):
      self.pins.remove(lambda pin: not pin.is_standing)
      self.launch()
      frame.knocked_down_pins['second_throw'] = list(filter(lambda pin: not pin.is_standing, self.pins))
      frame.standing_pins = list(filter(lambda pin: pin.is_standing, self.pins))
      self.pins = list(filter(lambda pin: pin.is_standing, self.pins))
    else:
      frame.standing_pins = list(filter(lambda pin: pin.is_standing, self.pins))
      self.pins = list(filter(lambda pin: pin.is_standing, self.pins))
    return frame

  def last_round(self, number) -> ExtraFrame:
    extra_frame = ExtraFrame(number)
    posible_throws = ['first_throw', 'second_throw', 'third_throw']
    for throw_turn in posible_throws:
      self.launch()
      extra_frame.knocked_down_pins[throw_turn] = list(filter(lambda pin: not pin.is_standing, self.pins))
      self.pins.remove(lambda pin: not pin.is_standing)

  def start(self, print: bool = True) -> None:
    self.calculate()
    self.final_score = self.frames[len(self.frames) - 1].total_score
    if print: self.print
