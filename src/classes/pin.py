class Pin:
  def __init__(self, number: int):
    self.is_standing: bool = True
    self.number: int = number

  def knock_down(self) -> None:
    self.is_standing = False
