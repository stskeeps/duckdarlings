// app/api/getState/route.js

import { NextResponse } from 'next/server';


export async function GET(request) {

  try {

    return NextResponse.json({ test: "hello World" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
