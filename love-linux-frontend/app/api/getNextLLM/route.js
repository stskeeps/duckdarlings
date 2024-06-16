// app/api/getState/route.js

import { NextResponse } from 'next/server';

import { exec }  from "child_process";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dialog = searchParams.get('current_dialog');
  console.log(dialog)

  exec("ls -la", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });

  try {
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
