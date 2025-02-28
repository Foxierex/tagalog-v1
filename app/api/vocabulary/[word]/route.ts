import { NextResponse } from "next/server"

// This would connect to your Supabase database in production
export async function GET(request: Request, { params }: { params: { word: string } }) {
  const word = params.word

  // Mock data - in production, this would fetch from Supabase
  const wordDetails = {
    word: word,
    rootWord: word === "magsalita" ? "salita" : "unknown",
    partOfSpeech: "verb",
    affixes: word === "magsalita" ? "mag-" : "",
    translations: {
      en: word === "magsalita" ? "to speak" : "unknown",
      zh: word === "magsalita" ? "说话" : "未知",
    },
    tagalogDefinition:
      word === "magsalita" ? "ang pagbigkas ng mga salita upang ipahayag ang isang kaisipan" : "walang kahulugan",
    conjugations: [
      { tense: "Infinitive", form: word, translation: "to speak" },
      { tense: "Completed", form: word.replace("mag", "nag"), translation: "spoke" },
      { tense: "Uncompleted", form: word.replace("mag", "nagsasa"), translation: "speaking" },
      { tense: "Contemplated", form: word.replace("mag", "magsa"), translation: "will speak" },
    ],
    exampleSentences: [
      {
        tagalog: `${word} ka ng Tagalog.`,
        translations: {
          en: "Speak in Tagalog.",
          zh: "用他加禄语说话。",
        },
      },
      {
        tagalog: `${word.replace("mag", "nagsasa")} siya ng maraming wika.`,
        translations: {
          en: "He/She speaks many languages.",
          zh: "他/她会说很多种语言。",
        },
      },
      {
        tagalog: `${word.replace("mag", "nag")} ang guro sa klase.`,
        translations: {
          en: "The teacher spoke to the class.",
          zh: "老师对班级讲话。",
        },
      },
    ],
  }

  return NextResponse.json(wordDetails)
}

