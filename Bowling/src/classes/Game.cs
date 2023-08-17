using System.Collections.ObjectModel;

namespace Bowling;

public class Game
{
  public int FinalScore { get; set; }
  public List<BaseFrame> Frames { get; }
  public List<Pin> Pins { get; set; }
  public Game()
  {
    FinalScore = 0;
    Frames = new();
    Pins = new();
    Start();
  }
  private void SetUpPins()
  {
    for (int i = 0; i < 10; i++)
    {
      Pins.Insert(i, new Pin(Number: i + 1));
    }
  }
  private void Launch()
  {
    Bowl bowl = new();
    bowl.Throw();
    foreach (var pin in Pins)
    {
      if (pin.IsStanding && bowl.Precision >= new Random().Next(0, 101))
      {
        pin.KnockDown();
      }
    }
  }
  private Frame Round(int Number)
  {
    Frame frame = new(Number: Number);
    Launch();
    if (Pins.Any((pin) => pin.IsStanding))
    {
      frame.KnockedDownPins["FirstThrow"] = Pins.Where((pin) => !pin.IsStanding).ToList();
      Pins.RemoveAll((pin) => !pin.IsStanding);
      Launch();
      frame.KnockedDownPins["SecondThrow"] = Pins.Where((pin) => !pin.IsStanding).ToList();
      Pins.RemoveAll((pin) => !pin.IsStanding);
      frame.StandingPins = Pins;
    }
    else
    {
      frame.KnockedDownPins["FirstThrow"] = Pins.Where((pin) => !pin.IsStanding).ToList();
      Pins.RemoveAll((pin) => !pin.IsStanding);
      frame.StandingPins = Pins;
    }
    return frame;
  }
  private ExtraFrame LastRound(int Number)
  {
    ExtraFrame extraFrame = new ExtraFrame(Number: Number);
    List<string> possibleThrows = new() { "FirstThrow", "SecondThrow", "ThirdThrow" };
    foreach (var throwTurn in possibleThrows)
    {
      Launch();
      extraFrame.KnockedDownPins[throwTurn] = Pins.Where((pin) => !pin.IsStanding).ToList();
      Pins.RemoveAll((pin) => !pin.IsStanding);
      if (extraFrame.Strikes[throwTurn] && possibleThrows[possibleThrows.IndexOf(throwTurn)] != "ThirdThrow")
      {
        SetUpPins();
      }
      else if (possibleThrows[possibleThrows.IndexOf(throwTurn)] == "SecondThrow" && extraFrame.Spares["SecondPairThrow"])
      {
        SetUpPins();
      }
      else
      {
        break;
      }
    }
    return extraFrame;
  }
  private void Calculate()
  {
    for (int i = 1; i <= 10; i++)
    {
      SetUpPins();
      BaseFrame roundFrame = i < 10 ? Round(Number: i) : LastRound(Number: i);
      Frames.Add(roundFrame);
    }
    foreach (var frame in Frames)
    {
      int i = Frames.IndexOf(frame);
      if (i < 8 && frame is Frame)
      {
        if (((Frame)frame).Strike)
        {
          ((Frame)frame).BonusPoints = Frames[i + 1].FirstThrowScore;
          BaseFrame nextFrame = Frames[i + 1];
          if (nextFrame is Frame)
          {
            ((Frame)frame).BonusPoints += ((Frame)nextFrame).Strike ? Frames[i + 2].FirstThrowScore : Frames[i + 1].SecondThrowScore;
          }
        }
        else if (((Frame)frame).Spare)
        {
          ((Frame)frame).BonusPoints = Frames[i + 1].FirstThrowScore;
        }
        if (i >= 1 && Frames[i - 1] != null)
        {
          frame.TotalScore += Frames[i - 1].TotalScore;
        }
        frame.TotalScore += frame.FrameScore;
      }
      else if (i == 8 && frame is Frame)
      {
        if (((Frame)frame).Strike)
        {
          ((Frame)frame).BonusPoints = Frames[i + 1].FirstThrowScore;
          ((Frame)frame).BonusPoints = Frames[i + 1].SecondThrowScore;
        }
        else if (((Frame)frame).Spare)
        {
          ((Frame)frame).BonusPoints = Frames[i + 1].FirstThrowScore;
        }
        if (i >= 1 && Frames[i - 1] != null)
        {
          frame.TotalScore += Frames[i - 1].TotalScore;
        }
        frame.TotalScore += frame.FrameScore;
      }
      else if (i == 9 && frame is ExtraFrame)
      {
        if (i >= 1 && Frames[i - 1] != null)
        {
          frame.TotalScore += Frames[i - 1].TotalScore;
        }
        frame.TotalScore += frame.FrameScore;
      }
    }
  }
  private void Print()
  {
    Console.WriteLine($"Final Score: {FinalScore}");
  }
  private void Start(bool Print = true)
  {
    Calculate();
    FinalScore = Frames[Frames.Count - 1].TotalScore;
    if (Print) this.Print();
  }
}
