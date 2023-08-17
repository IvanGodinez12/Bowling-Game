namespace Bowling;

public class Pin
{
  public bool IsStanding { get; set; }
  public int Number { get; set; }

  public Pin(int Number)
  {
    IsStanding = true;
    this.Number = Number;
  }

  public void KnockDown()
  {
    IsStanding = false;
  }
  public void Raise()
  {
    IsStanding = true;
  }
}
