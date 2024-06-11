// app/api/getState/route.js

import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { NextResponse } from 'next/server';

const decoder = new TextDecoder()

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cid = searchParams.get('cid');

  if (!cid) {
    return NextResponse.json({ error: 'CID is required' }, { status: 400 });
  }
  console.log("retrieving: ", cid)

  // create a Helia node
  const helia = await createHelia()
  const fs = unixfs(helia)
  console.log("create helia")
  try {
    let text = ''

    for await (const chunk of fs.cat(cid)) {
    text += decoder.decode(chunk, {
        stream: true
    })
    }

    return NextResponse.json({ bb }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
