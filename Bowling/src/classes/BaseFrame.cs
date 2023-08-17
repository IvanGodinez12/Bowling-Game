namespace Bowling;

public abstract class BaseFrame
{
  public int BonusPoints { get; set; }
  public Dictionary<string, List<Pin>> KnockedDownPins { get; set; }
  public int Number { get; set; }
  public List<Pin> StandingPins { get; set; }
  public int TotalScore { get; set; }

  public BaseFrame(int Number)
  {
    BonusPoints = 0;
    KnockedDownPins = new()
    {
        { "FirstThrow", new() },
        { "SecondThrow", new() },
    };
    if (Number == 10)
    {
      KnockedDownPins.Add("ThirdThrow", new());
    }
    this.Number = Number;
    StandingPins = new();
    TotalScore = 0;
  }

  public int FirstThrowScore
  {
    get => KnockedDownPins["FirstThrow"].Count;
  }
  public int FrameScore
  {
    get => RoundScore + BonusPoints;
  }
  public virtual int RoundScore
  {
    get => KnockedDownPins["FirstThrow"].Count + KnockedDownPins["SecondThrow"].Count;
  }
  public int SecondThrowScore
  {
    get => KnockedDownPins["SecondThrow"].Count;
  }
}
