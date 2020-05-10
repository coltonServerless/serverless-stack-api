export async function helloSecond(event, context) {
    const practiceStr = 'this is just a little practice';
    const helloMan = `Well, hello there ${practiceStr}`;

    return helloMan;
}