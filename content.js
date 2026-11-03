/*
 * 網站內容都集中在這裡。
 * 1. 修改引號中的文字即可換文案。
 * 2. 照片放進 img/，再把 image 改成對應檔名，例如 img/camp-01.jpg。
 * 3. members 只需要填姓名，最多 20 人也沒問題。
 */
window.CAMP_CONTENT = {
  camp: {
    shortTitle: "逃離日常",
    kicker: "FELLOWSHIP CAMP · 2026",
    title: "逃離<br>日常",
    intro: "兩天一夜，從城市尋寶到攀岩挑戰，在青年旅舍裡一起吃、一起聊，也一起把原本不熟的人變成之後會想念的夥伴。",
    date: "2026 · TWO DAYS, ONE NIGHT",
    location: "青年旅舍",
    cover: "img/cover.svg",
    coverAlt: "逃離日常凝聚營主照片預留位置",
    note: "Fellowship<br>makes us closer.",
    story: "我們不是來打卡一張漂亮照片，而是把手機收進口袋一點點，真的走進彼此的日常。迷路就當作支線探索，卡在岩牆上就互相加油；這趟旅程沒有完美劇本，卻剛好有最真實的我們。",
    days: 2
  },
  marquee: ["城市尋寶", "攀岩挑戰", "青年旅舍", "深夜談心", "支線探索", "嗯哼～"],
  itinerary: [
    {
      day: "DAY 01",
      title: "從陌生到一起走",
      items: [
        { time: "10:00", title: "集合出發", text: "別當失蹤人口，先跟今天的夥伴打聲招呼。" },
        { time: "13:30", title: "城市尋寶", text: "一起找、一起想；走錯路，我們就叫它支線探索。" },
        { time: "18:00", title: "入住青年旅舍", text: "放下行李、一起吃飯，也把防備慢慢放下來。" },
        { time: "21:00", title: "夜聊時光", text: "交換故事與笑聲，讓今天不只留在相簿裡。" }
      ]
    },
    {
      day: "DAY 02",
      title: "一起往上，再一起回家",
      items: [
        { time: "08:30", title: "早安早餐", text: "睡眼惺忪也沒關係，先把肚子和精神填飽。" },
        { time: "10:30", title: "攀岩挑戰", text: "卡住時，下面永遠有人說：可以啦、快到了啦！" },
        { time: "14:30", title: "回顧分享", text: "說一件最意外的事，也記住一個剛認識的名字。" },
        { time: "16:00", title: "帶著回憶返程", text: "不只多幾張照片，也多幾個之後想到會笑的片段。" }
      ]
    }
  ],
  gallery: [
    { image: "img/memory-01.svg", alt: "凝聚營照片預留位置一", title: "集合，出發", caption: "DAY 01 · 10:00" },
    { image: "img/memory-02.svg", alt: "凝聚營照片預留位置二", title: "城市尋寶中", caption: "DAY 01 · 13:30" },
    { image: "img/memory-03.svg", alt: "凝聚營照片預留位置三", title: "今晚住這裡", caption: "DAY 01 · 18:00" },
    { image: "img/memory-04.svg", alt: "凝聚營照片預留位置四", title: "深夜還不想睡", caption: "DAY 01 · 22:40" },
    { image: "img/memory-05.svg", alt: "凝聚營照片預留位置五", title: "一起往上爬", caption: "DAY 02 · 10:30" },
    { image: "img/memory-06.svg", alt: "凝聚營照片預留位置六", title: "我們下次見", caption: "DAY 02 · 16:00" }
  ],
  quotes: [
    "走錯路？那叫支線探索。",
    "最好的風景，是我們都在。",
    "不用很會爬，只要記得互相加油。",
    "如果只跟原本的人聊天，那開 Discord 就好了。",
    "多認識一個人，多留下一個會笑的回憶。"
  ],
  members: ["林小晴", "陳子安", "王以樂", "張庭瑋", "李佳恩", "黃柏宇", "吳心妤", "周品澤", "許語彤", "蔡承翰", "鄭羽柔", "劉冠廷"]
};
