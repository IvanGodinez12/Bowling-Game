namespace Bowling;

public class ExtraFrame : BaseFrame
{
  public ExtraFrame(int Number) : base(Number)
  {
    BonusPoints = 0;
    KnockedDownPins = new()
    {
        { "FirstThrow", new() },
        { "SecondThrow", new() },
        { "ThirdThrow", new() },
    };
    this.Number = Number;
    StandingPins = new();
    TotalScore = 0;
  }

  public override int RoundScore
  {
    get => KnockedDownPins["FirstThrow"].Count + KnockedDownPins["SecondThrow"].Count + KnockedDownPins["ThirdThrow"].Count;
  }
  public Dictionary<string, bool> Spares
  {
    get => new()
    {
        { "FirstPairThrow", KnockedDownPins["FirstThrow"].Count + KnockedDownPins["SecondThrow"].Count == 10 },
        { "SecondPairThrow", KnockedDownPins["SecondThrow"].Count + KnockedDownPins["ThirdThrowThrow"].Count == 10 }
    };
  }
  public Dictionary<string, bool> Strikes
  {
    get => new()
  {
      { "FirstThrow", KnockedDownPins["FirstThrow"].Count == 10 },
      { "SecondThrow", KnockedDownPins["SecondThrow"].Count == 10 },
      { "ThirdThrow", KnockedDownPins["ThirdThrow"].Count == 10 },
  };
  }
  public int ThirdThrowScore
  {
    get => KnockedDownPins["ThirdThrow"].Count;
  }
}
