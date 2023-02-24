// DOM
const trackers_side = document.querySelector("#tracker_side");

const fetchingData = async (path) => {
  let response = await fetch(path);
  let result = await response.json();
  // console.log(`fetching`);
  return result;
};

/*
const memoizingAsyncFunction = (fn, getKey) => {
  const memo = new Map(); 
  
  return function (...args) {
    let key = getKey(...args);
    // console.log("key :" + key);
    if (memo.has(key)) return memo.get(key);

    fn.apply(this, [key]).then((data) => {
      memo.set(key, data);
      
      console.log("memo inner  Fn apply \n", memo); //data is here
      return data;
    });
  };
};

const memoAsyncFetchingData = memoizingAsyncFunction(
  fetchingData,
  (path) => path
  );
  */
// window.onload = memoAsyncFetchingData("/data.json");

const printTrackers = async (data, periodSelected) => {
  trackers_side.innerHTML = "";
  // console.log(data === undefined);
  // console.log("data in printFn", data); //w/ memoAsyncFetchingData data = undefined just on the  first time

  for (const track in data) {
    console.log(`looping`);
    if (Object.hasOwnProperty.call(data, track)) {
      const ele = data[track];

      let title =
        ele.title == "Self Care"
          ? "self-care"
          : String(ele.title).toLowerCase();

      let tracker = `
  <div class="tracker" style="background-color: var(${ele.color})">
    <div class="tracker__icon">
      <img src="images/icon-${title}.svg" alt="icon-${ele.title}" />
    </div>
    <div class="tracker__time">
      <div class="tracker__head">
        <p class="tracker__activity">${ele.title}</p>
        <div class="tracker__more">
          <img src="images/icon-ellipsis.svg" alt="more-setting" />
        </div>
      </div>
      <div class="tracker__body">
    
      <p class="tracker__hours">${ele.timeframes[periodSelected].current}hrs</p>
      <p class="tracker__last">Last <span>${periodSelected}</span> - ${ele.timeframes[periodSelected].previous}hrs</p>
    
      </div>
    </div> 
  </div>
  </div>
      `;

      trackers_side.innerHTML += tracker;
    }
  }
};

/*
document.addEventListener(
  "DOMContentLoaded",
  printTrackers(memoAsyncFetchingData("/data.json"), "daily")
  );
  */

const dataArr = [];

fetchingData("/data.json")
  .then((data) => dataArr.push(...data))
  .then(() => printTrackers(dataArr, "daily"));

function onClickPeriodValue(period) {
  printTrackers(dataArr, period.value);
}
