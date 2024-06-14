// app/api/getState/route.js

import { NextResponse } from 'next/server';

let dialogData = [
  { 
    type: 0,
    text: "You make your way to the counter at a cute coffee cafe after the first day of your work at your new job\n\nThe barista hands you a flat white, complete with a recycled paper sleeve and your name written on the side.",
    showPenguin: 0
  },
  {
    type: 3,
    text: "What does it say on the cup?",
    showPenguin: 0
  },
  {
    type: 1,
    text: "Y/N: Thank you!",
    showPenguin: 0
  },
  {
    type: 0,
    text: "You sit down and grab a book out of your bag. Even though today was a tough day at work, you still make time for your hobbies. ",
    showPenguin: 0
  },
  {
    type: 1,
    text: "Linux: Is it good?",
    showPenguin: 1
  },
  {
    type: 1,
    text: "You lift your head to see…",
    showPenguin: 1
  },
  {
    type: 1,
    text: "(Penguin Linux lol)",
    showPenguin: 1
  },
  {
    type: 1,
    text: "You blush. He’s kinda cute.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Y/N: Yeah, they have good coffee here!",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux chuckles.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux: I mean the book. Is it a good book?",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Y/N: Oh! I’m only 23 pages in, but so far it’s very interesting.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Y/N: Why? Are you interested in game design?",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux turns his laptop around so you can see his screen.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux: I’m actually in the process of developing one. I’m kinda stuck on it though. I guess I lost inspiration.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Y/N: Maybe I can help.",
    showPenguin: 1
  },
  {
    type: 2,
    options: [
      "How did you get interested in game design?",
      "What’s your favourite game?",
      "Are you really a talking penguin?"
    ],
    showPenguin: 1
  },
  {
    type: 1,
    text: "LLM",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux: Either way, there’s no way I can finish this before the big conference.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Y/N: Conference?",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux: Yeah. Every year there’s a web3 gaming conference here in the city. I wanted to showcase my new game there but it doesn’t seem like it will be finished by then.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux: Yeah. Every year there’s a web3 gaming conference here in the city. \nI wanted to showcase my new game there but it doesn’t seem like it will be finished by then.",
    showPenguin: 1
  },
  {
    type: 2,
    options: [
      "Sucks to suck.",
      "What’s with the negative attitude?",
      "I think you can do it!"
    ],
    showPenguin: 1
  },
  {
    type: 1,
    text: "LLM",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Anyway, I would love some help if you’re free this weekend.\nWhat do you say?\nStroll around the park while chatting and brainstorming about nerdy web3 games?",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Y/N: Sounds good!",
    showPenguin: 1
  },
  {
    type: 1,
    text: "You exchange numbers with Linux, who shyly smiles the whole time.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux puts his laptop in his bag and gets up to leave.",
    showPenguin: 1
  },
  {
    type: 1,
    text: "Linux: See you this weekend.\nI’ll text you the details.",
    showPenguin: 1
  },
  {
    type: 0,
    text: "You smile to yourself before turning back to your book.",
    showPenguin: 1
  },
]

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dialog = searchParams.get('current_dialog');
  console.log(dialog)

  try {
    return NextResponse.json(dialogData[dialog], { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
