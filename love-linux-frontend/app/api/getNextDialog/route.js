// app/api/getState/route.js

import { NextResponse } from 'next/server';

let dialogData = [
  { 
    scene: 1,
    type: 0,
    text: "You make your way to the counter at a cute coffee cafe after the first day of your work at your new job\n\nThe barista hands you a flat white, complete with a recycled paper sleeve and your name written on the side.",
    showPenguin: 0
  },
  {
    scene: 1,
    type: 3,
    text: "What does it say on the cup?",
    showPenguin: 0
  },
  {
    scene: 1,
    type: 1,
    text: "Y/N: Thank you!",
    showPenguin: 0
  },
  {
    scene: 1,
    type: 0,
    text: "You sit down and grab a book out of your bag. Even though today was a tough day at work, you still make time for your hobbies.",
    showPenguin: 0
  },
  {
    scene: 1,
    type: 1,
    text: "Someone: Is it good?",
    showPenguin: 0
  },
  {
    scene: 1,
    type: 1,
    text: "You lift your head to see…",
    showPenguin: 0
  },
  {
    scene: 1,
    type: 1,
    text: "(Penguin Linux lol)",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "You blush. He’s kinda cute.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Y/N: Yeah, they have good coffee here!",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux chuckles.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux: I mean the book. Is it a good book?",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Y/N: Oh! I’m only 23 pages in, but so far it’s very interesting.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Y/N: Why? Are you interested in game design?",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux turns his laptop around so you can see his screen.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux: I’m actually in the process of developing one. I’m kinda stuck on it though. I guess I lost inspiration.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Y/N: Maybe I can help.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 2,
    options: [
      "How did you get interested in game design?",
      "What’s your favourite game?",
      "Are you really a talking penguin?"
    ],
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "LLM",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux: Either way, there’s no way I can finish this before the big conference.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Y/N: Conference?",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux: Yeah. Every year there’s a web3 gaming conference here in the city. I wanted to showcase my new game there but it doesn’t seem like it will be finished by then.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 2,
    options: [
      "Sucks to suck.",
      "What’s with the negative attitude?",
      "I think you can do it!"
    ],
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "LLM",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Anyway, I would love some help if you’re free this weekend.\nWhat do you say?\nStroll around the park while chatting and brainstorming about nerdy web3 games?",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Y/N: Sounds good!",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "You exchange numbers with Linux, who shyly smiles the whole time.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux puts his laptop in his bag and gets up to leave.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 1,
    text: "Linux: See you this weekend.\nI’ll text you the details.",
    showPenguin: 1
  },
  {
    scene: 1,
    type: 0,
    text: "You smile to yourself before turning back to your book.",
    showPenguin: 0
  },
  {
    scene: 2,
    type: 1,
    text: "Y/N: Okay, I have to look cute.\nIs it a date? I'm not sure.",
    showPenguin: 0
  },
  {
    scene: 2,
    type: 0,
    text: "Going through your wardrobe, you choose your outfit.",
    showPenguin: 0
  },
  {
    scene: 2,
    type: 1,
    text: "Which one do you choose?",
    showPenguin: 0
  },
  {
    scene: 3,
    type: 0,
    text: "You’re walking through the park to the bridge where Linux texted he’d meet you there.",
    showPenguin: 0
  },
  {
    scene: 3,
    type: 1,
    text: "Linux: There you are!",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux walks over to you and waves.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Y/N: Hey!",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux rakes his eyes up and down, checking you out.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "What was the outfit you picked?",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 2,
    options: [
      "Cute summer dress",
      "Casual jeans and t-shirt",
      "Evening dress."
    ],
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "LLM",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "You blush.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Y/N: Thank you.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 2,
    options: [
      "You look handsome.",
      "Is that all you have?",
      "So, is this a date?"
    ],
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "LLM",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux: Let's go on a walk.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "You walk around and chat.\nLinux points at a bench and you decide to sit down.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Y/N: so how long have you been working at this game?",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux: a couple of months now. I just can't seem to get it right.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Y/N: Get what right exactly?",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux: something just feels off.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Y/N: And what would that be?",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux: That's what I'm trying to figure out.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 2,
    options: [
      "Maybe you haven't found the right inspiration yet.",
      "Maybe just build it and see what happens.",
      "Why not just quit then?"
    ],
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "LLM",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux: Anyway enough about that. What about you? What got you interested in game design?",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 2,
    options: [
      "I love writing a good storyline",
      "I’m very competitive and love dunking on noobs",
      "… hot graphics"
    ],
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "LLM",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux laughs.\nLinux: seems like you know what youre talking about.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Y/N: Well let’s work on your game then.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux: Really? You would do that?",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Y/N: Yeah! Sounds like it'd be fun.",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 1,
    text: "Linux smiles\nLinux: Let's do it!",
    showPenguin: 3
  },
  {
    scene: 3,
    type: 0,
    text: "The rest of the afternoon you spend chatting and laughing until it is time to head back.",
    showPenguin: 0
  },
  {
    scene: 3,
    type: 0,
    text: "As you get home you check your phone to see a text from Linux\n\"Thank you for today, can't wait to see you again\"",
    showPenguin: 0
  },
  {
    scene: 3,
    type: 2,
    options: [
      "I had a great time!",
      "Sweet dreams",
      "k"
    ],
    showPenguin: 0
  },
  {
    scene: 3,
    type: 0,
    text: "You go to bed",
    showPenguin: 0
  },
  {
    scene: 4,
    type: 0,
    text: "You make your way over to Linux’ apartment and ring the doorbell.\nLinux opens the door in his casual sweats.",
    showPenguin: 0
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: Hey, come in!",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "You enter the room and look around. You notice the shelf of rocks. He lives in a nice apartment. It's clean, I guess.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: Please make yourself comfortable.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "You sit down on the sofa as he grabs you some water.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: So, where do we start with this Otome game?",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Y/N: Let’s start defining some basics.\nThe genre should be",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 2,
    options: [
      "Romance",
      "Drama",
      "Betrayal"
    ],
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "LLM",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: That’s a classic.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: What about the location?",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 2,
    options: [
      "Cafe",
      "Park",
      "Game convention"
    ],
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "LLM",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: Okay let’s get started",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 0,
    text: "Hours pass. You and Linux have been working hard on this game and sleep is slowly catching up on you both.\nYou let out a yawn.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: You okay?",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 2,
    options: [
      "Feeling good still",
      "Getting a bit tired",
      "I’m crashing hard"
    ],
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Y/N: , what about you?",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux stares at you. There’s a look in his eyes that sends shivers down your spine.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "He puts his hand on your leg and gets closer. His mouth is inches away from yours.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "What do you do?",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 2,
    options: [
      "Kiss him",
      "Pull your head away",
      "Smack him"
    ],
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "LLM",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Linux: Okay let’s go back to the game and finish it.",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 1,
    text: "Y/N: Did that just really happen?",
    showPenguin: 4
  },
  {
    scene: 4,
    type: 0,
    text: "For the rest of the night you work together, finishing the game.",
    showPenguin: 0
  },
  {
    scene: 5,
    type: 0,
    text: "It’s finally the day of the game convention. Both you and Linux have worked really hard on the game and are proud to present the final product.\nYou walk around to find Linux. You’ve texted him a couple of times but he hasn’t replied.\nEither way, you know you have a presentation to nail so you head over to the stage.",
    showPenguin: 0
  },
  {
    scene: 5,
    type: 1,
    text: "Linux spots you and walks over to you.",
    showPenguin: 0
  },
  {
    scene: 5,
    type: 1,
    text: "Linux: Hey!",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Y/N: Hey there, how are you feeling? I haven’t heard from you in a while.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Linux: I’m sorry, life has been hectic lately.\nI’m feeling nervous about the big presentation, but overall I’m feeling well! What about you?",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 2,
    options: [
      "I’m excited to showcase our game.",
      "I’m quite nervous. Presentations are not my forte.",
      "Where have you been?"
    ],
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "LLM",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Linux: Anyway, let’s go do this presentation.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Linux is being announced on stage. You’ve practiced this presentation before and know you’re being called on stage after the introduction.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Y/N: Did I just miss my cue?",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Linux: It has always been my dream to write a [genre choice] Otome game based on a [location choice] and I’m so proud to have pulled it off to show you.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Y/N: No fucking way.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "The puzzle pieces are finally clicking together. The sudden ignoring of texts, the distance between you two. It’s all making sense.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "He used you to finish his game.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "There’s no way you’re going to accept this happening.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "You storm onto the stage and pull the microphone out of his hand.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 2,
    options: [
      "That’s a funny way of introducing our game.",
      "Linux is a lying piece of trash."
    ],
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "LLM",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "You try to speak again but Linux manages to grab the microphone and pushes you off the stage.",
    showPenguin: 5
  },
  {
    scene: 5,
    type: 1,
    text: "Y/N: What the…",
    showPenguin: 0
  },
  {
    scene: 5,
    type: 1,
    text: "Maybe I should take a few days off and detox myself from Cartesi.",
    showPenguin: 0
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
