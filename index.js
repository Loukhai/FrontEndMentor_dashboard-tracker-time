const trackers_side = document.querySelector("#tracker_side");

const fetchingData = async (path) => {
  let response = await fetch(path);
  let result = await response.json();
  return result;
};

const printTrackers = async (data, periodSelected) => {
  trackers_side.innerHTML = "";

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
        <svg width="21" height="5" alt="more-setting" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
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

const dataArr = [];

fetchingData("./data.json")
  .then((data) => dataArr.push(...data))
  .then(() => printTrackers(dataArr, "daily"));

function onClickPeriodValue(period) {
  printTrackers(dataArr, period.value);
}
