// src/lib/constants.ts

export type KeyType = "normal" | "special";

export type KeyDefinition = {
    label: string;
    value: string;
    type?: KeyType;
    width?: number;
};

export const KEYBOARD_LAYOUT: KeyDefinition[][] = [
    [
        { label: "Q", value: "q" },
        { label: "W", value: "w" },
        { label: "E", value: "e" },
        { label: "R", value: "r" },
        { label: "T", value: "t" },
        { label: "Y", value: "y" },
        { label: "U", value: "u" },
        { label: "I", value: "i" },
        { label: "O", value: "o" },
        { label: "P", value: "p" },
    ],
    [
        { label: "A", value: "a" },
        { label: "S", value: "s" },
        { label: "D", value: "d" },
        { label: "F", value: "f" },
        { label: "G", value: "g" },
        { label: "H", value: "h" },
        { label: "J", value: "j" },
        { label: "K", value: "k" },
        { label: "L", value: "l" },
    ],
    [
        { label: "Shift", value: "Shift", type: "special", width: 1.5 },
        { label: "Z", value: "z" },
        { label: "X", value: "x" },
        { label: "C", value: "c" },
        { label: "V", value: "v" },
        { label: "B", value: "b" },
        { label: "N", value: "n" },
        { label: "M", value: "m" },
        { label: "Backspace", value: "Backspace", type: "special", width: 1.5 },
    ],
    [
        { label: "Space", value: " ", type: "special", width: 5 },
    ],
];

export type Difficulty = 'easy' | 'med' | 'hard';

export interface CurriculumDay {
    id: number;
    title: string;
    difficulty: Difficulty;
    sentences: string[];
}

export const CURRICULUM: CurriculumDay[] = [
    { id: 1, title: "Home Row - asdf", difficulty: 'easy', sentences: ["asdf asdf asdf asdf jkl; jkl; jkl; jkl;", "asdf jkl; asdf jkl; sadf ;lkj fads ;lkj", "fads jkl; asdf jkl; sadf ;lkj fads jkl;"] },
    { id: 2, title: "Home Row - g and h", difficulty: 'easy', sentences: ["asdf jkl; gh gh gh gh asdf jkl;", "had has gad gas hag jabs fabs", "asdf jkl; gh gh asdf jkl; sadf ;lkj"] },
    { id: 3, title: "Top Row - e and t", difficulty: 'easy', sentences: ["the the the the tet tet tet eat tea", "there three those them then they theme", "the quick brown fox jumps over the lazy dog"] },
    { id: 4, title: "Top Row - r and u", difficulty: 'easy', sentences: ["the red rat ran to the river for water", "there is no truth to that rumor about you", "nature has a way of returning to its roots"] },
    { id: 5, title: "Top Row - i and o", difficulty: 'easy', sentences: ["the quick brown fox jumps over the lazy dog", "it is an important issue that must be resolved", "options are limited but we have to work with them"] },
    { id: 6, title: "Top Row - p and y", difficulty: 'easy', sentences: ["you can type your way to success every day", "the puppy plays in the park by the pond", "yes you can do it no one will stop you now"] },
    { id: 7, title: "Top Row - w and q", difficulty: 'easy', sentences: ["quick wright western water quality question", "wednesday will be the best day to start new", "the question was who won the quick contest"] },
    { id: 8, title: "Bottom Row - z x c", difficulty: 'easy', sentences: ["zxcv bnm zxcv bnm zxcv bnm zxcv", "the lazy fox jumped over the big brown log", "examine the box for any defects or issues"] },
    { id: 9, title: "Bottom Row - v b n m", difficulty: 'easy', sentences: ["verb verb verb noun verb noun verb noun", "brown bugs buzz around the big blue banner", "move the mouse and click the submit button"] },
    { id: 10, title: "Foundation Review", difficulty: 'easy', sentences: ["the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs", "a journey of a thousand miles begins with a single step forward into the unknown", "programming is the art of telling a computer what to do step by step and character by character"] },
    { id: 11, title: "Punctuation - Commas", difficulty: 'med', sentences: ["the quick, brown fox jumps, over the lazy dog, every morning, in the park.", "we need to think, plan, and execute the strategy, before the deadline, arrives.", "she said, i will go, and then, we can decide, what to do next, together."] },
    { id: 12, title: "Punctuation - Periods", difficulty: 'med', sentences: ["hello world. this is a test. typing is fun. practice makes perfect.", "the end is near. stay focused. keep going. you will succeed. never give up.", "welcome home. dinner is ready. how was your day? i missed you. lets talk."] },
    { id: 13, title: "Punctuation - Questions", difficulty: 'med', sentences: ["what is your name? where do you live? how old are you? when were you born?", "do you like coding? can you type fast? will you practice daily? should we start now?", "is this the right way? are you sure? could you help me? would you try again?"] },
    { id: 14, title: "Punctuation - Exclamation", difficulty: 'med', sentences: ["wow! amazing! incredible! fantastic! outstanding! congratulations!", "you did it! keep going! stay strong! never quit! believe in yourself!", "what a great day! how wonderful! thats awesome! i am so proud of you!"] },
    { id: 15, title: "Capital A and Q", difficulty: 'med', sentences: ["Apple Apricot Avocado Artichoke Arizona Atlantic America Anchor Arcade Artisan", "Queen Question Quick Quite Quality Quartz Quiz Quote Query Quota Quarter", "Andrew Albert Anthony Abigail Amanda Arthur Aaron Andrea Alberto Adrian"] },
    { id: 16, title: "Capital S and Z", difficulty: 'med', sentences: ["Saturday September Storm School Seattle Spring Summer Space Station Science", "Samantha Stephanie Sarah Sophia Samuel Scott Steven Shawn Simon Sebastian Stanley", "Zoe Zachary Zenith Zebra Zipper Zone Zero Zodiac Zucchini Zillow Zappos"] },
    { id: 17, title: "Capital W and M", difficulty: 'med', sentences: ["Wednesday Winter Water World Wide Web Work Week Website Widget Warrior", "Monday May March Morning Mountain Music Movie Michael Madison Marketing", "William Watson Wallace Wendy Wanda Wesley Walter Whitney Winston Wyatt"] },
    { id: 18, title: "Numbers 1-5", difficulty: 'med', sentences: ["12345 54321 13579 24680 112233 12345 12345 12345", "room 101 at 3pm on floor 2 for meeting 4 on day 1 of 5", "total cost is $42.50 with 15% discount making it $36.12 before tax"] },
    { id: 19, title: "Numbers 6-0", difficulty: 'med', sentences: ["67890 98765 09876 54321 112233445566 77889900", "port 8080 443 3000 5432 27017 6379 9200 8443 3306", "the year 2026 has 365 days and 12 months and 4 quarters in total"] },
    { id: 20, title: "Symbols - Punctuation", difficulty: 'med', sentences: ["hello, world! how are you? im fine. and you? thats great! lets go.", "is this right? yes, it is. no, wait. maybe? hmm, interesting.", "one, two, three; four, five, six. seven, eight, nine; ten. done!"] },
    { id: 21, title: "Symbols - Code", difficulty: 'hard', sentences: ["const x = 10; let y = 20; if (x === y) { console.log('equal'); }", "function greet(name) { return `Hello, ${name}!`; } console.log(greet('World'));", "for (let i = 0; i < 10; i++) { console.log(i); } while (true) { break; }"] },
    { id: 22, title: "JavaScript - Arrays", difficulty: 'hard', sentences: ["const arr = [1, 2, 3]; arr.push(4); arr.map(x => x * 2); arr.filter(x => x > 2);", "const [a, b, c] = [1, 2, 3]; const sum = arr.reduce((acc, val) => acc + val, 0);", "const obj = { name: 'john', age: 30 }; Object.keys(obj); Object.values(obj);"] },
    { id: 23, title: "React - Hooks", difficulty: 'hard', sentences: ["const [count, setCount] = useState(0); useEffect(() => { document.title = count; }, [count]);", "const ref = useRef(null); useLayoutEffect(() => { ref.current?.focus(); }, []);", "const memo = useMemo(() => computeExpensive(a, b), [a, b]); const cb = useCallback(fn, []);"] },
    { id: 24, title: "HTML - Elements", difficulty: 'hard', sentences: ["<div class='container'><h1>Title</h1><p>Paragraph text here.</p></div>", "<button onClick={handleClick} className='btn'>Click Me</button><input type='text' placeholder='Enter'/>", "<ul><li>Item 1</li><li>Item 2</li></ul><img src='logo.png' alt='Logo'/>"] },
    { id: 25, title: "CSS - Flexbox", difficulty: 'hard', sentences: ["display: flex; flex-direction: row; justify-content: space-between; align-items: center;", "flex: 1 1 auto; flex-wrap: wrap; gap: 1rem; order: -1; align-self: stretch;", "flex-basis: 200px; flex-grow: 1; flex-shrink: 0; align-content: flex-start;"] },
    { id: 26, title: "CSS - Grid", difficulty: 'hard', sentences: ["display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto 1fr auto;", "grid-column: 1 / 3; grid-row: 2 / 4; grid-area: header; place-items: center;", "grid-template-areas: 'header header' 'sidebar main' 'footer footer'; grid-template: 60px 1fr 60px / 200px 1fr;"] },
    { id: 27, title: "Motivational - Churchill", difficulty: 'hard', sentences: ["success is not final, failure is not fatal: it is the courage to continue that counts. never surrender.", "a pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.", "you will never find time for anything. if you want time, you must make it. charles buxton"] },
    { id: 28, title: "Motivational - Ziglar", difficulty: 'hard', sentences: ["you dont have to be great to start, but you have to start to be great. believe in yourself always.", "positive thinking lets the power of focus work for you. the only limit is your imagination today.", "success is achieved and maintained by those who try and keep trying. persist and prevail."] },
    { id: 29, title: "Motivational - Robbins", difficulty: 'hard', sentences: ["its not what you do once in a while; its what you do all the time that changes everything forever.", "the secret of success is to learn from the past, to celebrate the present, and to get excited about the future.", "the only way you are going to have any kind of success is if you take massive action every single day."] },
    { id: 30, title: "Boss Level - Final", difficulty: 'hard', sentences: ["const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2); // O(2^n) - optimize with memoization for speed!", "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.", "Typro://complete?days=30&skills=fingers_of_steel. Congratulations, master typist! Your journey has just begun."] },
];

export const TYPING_SENTENCES: string[] = CURRICULUM.flatMap(d => d.sentences);

export const DEFAULT_TEXT = TYPING_SENTENCES[0];

export const DEFAULT_TEST_DURATION: number = 60;
