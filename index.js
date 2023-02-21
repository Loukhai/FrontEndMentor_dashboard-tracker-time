// DOM
const trackers_side = document.querySelector("#tracker_side");

const fetchingData = async (path) => {
  let response = await fetch(path);
  let result = await response.json();

  return result;
};

const memoizingAsyncFunction = (fn, getKey) => {
  const memo = new Map();

  return (...args) => {
    let key = getKey(...args);
    // console.log("key :" + key);
    if (memo.has(key)) return memo.get(key);

    fn.apply(this, [key]).then((data) => {
      memo.set(key, data);
      // console.log("hello");
      // console.log(memo);
      return memo.get(key);
    });
  };
};

const memoAsyncFetchingData = memoizingAsyncFunction(
  fetchingData,
  (path) => path
);
// window.onload = memoAsyncFetchingData("/data.json");

const printTrackers = async (data, periodSelected) => {
  trackers_side.innerHTML = "";

  // let data = dataFetched;
  // === undefined ? await dataFetched : dataFetched;
  console.log("data", data);

  for (const track in data) {
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

// window.onload = printTrackers(memoAsyncFetchingData("/data.json"), "daily");

window.addEventListener("pageshow", () => {
  printTrackers(memoAsyncFetchingData("/data.json"), "daily");
});

function onClickPeriodValue(period) {
  printTrackers(memoAsyncFetchingData("/data.json"), period.value);
}
