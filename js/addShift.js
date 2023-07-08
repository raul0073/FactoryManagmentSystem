const calcEndTime = () => {
  const endTimeInput = document.querySelector("#endInput");
  let selectOptions = document.querySelector("select");
  selectOptions = Number(selectOptions.value);

  if (selectOptions == 7) {
    endTimeInput.value = "15:00";
    endTimeInput.name = 15;
  }
  if (selectOptions == 15) {
    endTimeInput.value = "23:00";
    endTimeInput.name = 23;
  }
  if (selectOptions == 23) {
    endTimeInput.value = "07:00";
    endTimeInput.name = 7;
  }
};

const createNewShift = async () => {
  // get html elements
  let date = document.querySelector("#dateInput").value;
  let sTime = document.querySelector("#startInput");
  let eTime = document.querySelector("#endInput");

  const shift = {
    Date: date,
    Strat_Time: sTime.value,
    End_Time: eTime.name,
  };
  // post method params
  const params = {
    method: "POST",
    body: JSON.stringify(shift),
    headers: { "Content-Type": "application/json" },
  };

  const url = "https://localhost:44333/api/Shifts/";
  const resp = await fetch(url, params);
  const data = await resp.json();
  return data;
};
