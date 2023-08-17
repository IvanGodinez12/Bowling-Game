namespace Bowling;

public class Frame : BaseFrame
{
  public Frame(int Number) : base(Number)
  {
    BonusPoints = 0;
    KnockedDownPins = new()
    {
        { "FirstThrow", new() },
        { "SecondThrow", new() },
    };
    this.Number = Number;
    StandingPins = new();
    TotalScore = 0;
  }

  public bool Spare
  {
    get
    {
      if (Strike)
      {
        return false;
      }
      else if (KnockedDownPins["FirstThrow"].Count == 10)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
  public bool Strike
  {
    get
    {
      if (KnockedDownPins["FirstThrow"].Count == 10)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
}
