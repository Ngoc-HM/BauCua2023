const btnShuffle = document.querySelector(".btn-shuffle");
const result1 = document.querySelector(".result-1"),
  result2 = document.querySelector(".result-2"),
  result3 = document.querySelector(".result-3");
const audio = document.querySelector(".audio");
const dataImages = [
  "./images/bau.jpg",
  "./images/tom.jpg",
  "./images/cua.jpg",
  "./images/ca.jpg",
  "./images/huou.jpg",
  "./images/ga.jpg",
];
let dataHistory = localStorage.getItem("dataHistory")
  ? JSON.parse(localStorage.getItem("dataHistory"))
  : [];

let isShuffling = false;

const handleShuffleClick = () => {
  if (isShuffling) return;
  console.log("dac");
  handleShuffle();
};
let randomImg1 = "";
let randomImg2 = "";
let randomImg3 = "";
const handleShuffle = () => {
  isShuffling = true;
  audio.play();
  const timerId = setInterval(() => {
    randomImg1 = dataImages[randomNumber()];
    randomImg2 = dataImages[randomNumber()];
    randomImg3 = dataImages[randomNumber()];
    result1.setAttribute("src", randomImg1);
    result2.setAttribute("src", randomImg2);
    result3.setAttribute("src", randomImg3);
  }, 100);

  setTimeout(() => {
    clearTimeout(timerId);
    saveHistory(randomImg1, randomImg2, randomImg3);
    isShuffling = false;
  }, 5000);
};

const saveHistory = (img1, img2, img3) => {
  dataHistory.unshift([img1, img2, img3]);
  if (dataHistory.length > 10) {
    dataHistory.shift();
  }
  renderHistory();
  localStorage.setItem("dataHistory", JSON.stringify(dataHistory));
};

const renderHistory = () => {
  const historyElement = document.querySelector(".history");
  let htmlHistory = "<h2>Lịch sử</h2>";
  dataHistory.forEach((item) => {
    console.log(item);
    htmlHistory += `<div class="history-item">
    <img src="${item[0]}" alt="" />
    <img src="${item[1]}" alt="" />
    <img src="${item[2]}" alt="" />
  </div>`;
  });
  historyElement.innerHTML = htmlHistory;
};

const randomNumber = () => {
  return Math.floor(Math.random() * dataImages.length);
};
renderHistory();

btnShuffle.addEventListener("click", handleShuffleClick);
