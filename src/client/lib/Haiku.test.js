const Haiku = require("./Haiku");

const sampleHaikuBasho = [
  ["A", "cloud", "of", "flowers!"],
  ["Is", "the", "bell", "Uyeno"],
  ["Or", "Asakusa?"],
];

const sampleHaikuLewisGrandisonAlexander = [
  ["Life", "goes", "by", "moving"],
  ["Up", "and", "down", "a", "chain", "of", "moods"],
  ["Wanting", "what's", "nothing."],
];

describe("Haiku Class", () => {
  test("should initialize", () => {
    const haiku = new Haiku();
    expect(haiku.lines.length).toBe(3);
    const lines = sampleHaikuLewisGrandisonAlexander;
    const linePosition = 2;
    const nextWord = null;
    const haiku2 = new Haiku({ lines, linePosition, nextWord });
    expect(haiku2.lines.length).toBe(3);
    expect(haiku2.lines[0][0]).toBe("Life");
  });
  test("should check new words for unfinished haikus", () => {
    const origLines = sampleHaikuLewisGrandisonAlexander;
    const lines = [
      origLines[0],
      origLines[1],
      [],
      // [origLines[2][0], origLines[2][1]],
    ];
    linePosition = 2;
    nextWord = null;
    const haiku = new Haiku({ lines, linePosition, nextWord });
    expect(haiku.tryWord("Wanting")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("what's")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("everything")).toBe(false);
    expect(haiku.tryWord("nothing")).toBe(true);
    haiku.acceptWord();
    expect(haiku.finished).toBeTruthy;
  });
  test("should monitor as you build a haiku", () => {
    const haiku = new Haiku();
    expect(haiku.lines.length).toBe(3);
    const lines = [[], [], []];
    const linePosition = 0;
    const nextWord = null;
    const haiku2 = new Haiku({ lines, linePosition, nextWord });
    expect(haiku.tryWord("the")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("dog")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("is")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("under")).toBe(true);
    haiku.acceptWord();
    expect(haiku.linePosition).toBe(1);
    expect(haiku.tryWord("the")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("little")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("dog")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("house")).toBe(true);
    haiku.acceptWord();
    expect(haiku.tryWord("sleeping")).toBe(true);
    haiku.acceptWord();
    expect(haiku.linePosition).toBe(2);
  });
});
