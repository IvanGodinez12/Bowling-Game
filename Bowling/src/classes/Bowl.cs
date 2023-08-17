namespace Bowling;

public class Bowl
{
  public int Precision { get; set; }

  public Bowl()
  {
    Precision = 0;
  }
  public void Throw()
  {
    Precision = new Random().Next(0, 101);
  }
}
